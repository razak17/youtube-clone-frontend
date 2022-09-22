import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../lib/firebase';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { uploadVideo } from '../lib/api';
import { QueryKeys, Video } from '../types';

const Container = styled.div<{ sidebarOpen: boolean }>`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div<{ sidebarOpen: boolean }>`
	display: flex;
	justify-content: center;
	width: ${(props) => (props.sidebarOpen ? 'calc(100vw - 70px)' : 'calc(100vw - 270px)')};
`;

const Inner = styled.div<{ sidebarOpen: boolean }>`
	width: ${(props) => (props.sidebarOpen ? 'calc(100% - 70px)' : 'calc(100% - 270px)')};
	height: 100%;
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	padding: 20px 32px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	gap: 20px;
`;

const Title = styled.h3`
	text-align: center;
`;

const Input = styled.input`
	border: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	border-radius: 3px;
	padding: 6px;
	background-color: transparent;
	z-index: 999;
`;

const Desc = styled.textarea`
	border: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	border-radius: 3px;
	padding: 6px;
	background-color: transparent;
`;

const Button = styled.button`
	border-radius: 3px;
	border: none;
	padding: 6px 20px;
	font-weight: 500;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
	font-size: 14px;
`;

interface FormInterface {
	title: string;
	description: string;
	thumbnailUrl: string;
	videoUrl: string;
	tags: string[];
}

const Upload = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
	const [thumbnail, setThumbnail] = useState<File>();
	const [video, setVideo] = useState<File>();
	const [thumbnailProgress, setThumbnailProgress] = useState(0);
	const [videoProgress, setVideoProgress] = useState(0);
	const [formData, setFormData] = useState<FormInterface>({
		title: '',
		description: '',
		thumbnailUrl: '',
		videoUrl: '',
		tags: []
	});

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const handleChangeInput = (
		e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setFormData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => {
			return { ...prev, tags: e.target.value.split(',') as string[] };
		});
	};

	const uploadFile = (file: File, urlType: 'videoUrl' | 'thumbnailUrl') => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				/* eslint-disable-next-line max-len */
				urlType === 'thumbnailUrl'
					? setThumbnailProgress(Math.round(progress))
					: setVideoProgress(Math.round(progress));
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
					default:
						break;
				}
			},
			(error) => {
				throw error;
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setFormData((prev) => {
						return { ...prev, [urlType]: downloadURL };
					});
				});
			}
		);
	};

	const mutation = useMutation<Video, AxiosError, Parameters<typeof uploadVideo>['0']>(uploadVideo, {
		onSuccess: (data) => {
			queryClient.invalidateQueries([
				QueryKeys.VIDEOS,
				QueryKeys.CURRENT_VIDEO_OWNER,
				QueryKeys.COMMENTS
			]);
			navigate(`/watch/${data._id}`);
		}
	});

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	const handleVideoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setVideo(e.target.files[0]);
	};

	const handleThumbnailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setThumbnail(e.target.files[0]);
	};

	const handleUpload = () => {
		thumbnail && uploadFile(thumbnail, 'thumbnailUrl');
		video && uploadFile(video, 'videoUrl');
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log(formData);
		mutation.mutate(formData);
	};

	return (
		<Container sidebarOpen={sidebarOpen}>
			<Wrapper sidebarOpen={sidebarOpen}>
				<Inner sidebarOpen={sidebarOpen}>
					<Title>Upload a New Video</Title>
					<Label>Upload Video:</Label>
					{videoProgress > 0 ? (
						'Uploading video: ' + videoProgress + '% done'
					) : (
						<Input type='file' accept='video/*' onChange={handleVideoInput} />
					)}
					<Label>Upload Thumbnail:</Label>
					{thumbnailProgress > 0 ? (
						'Uploading thumbnail: ' + thumbnailProgress + '% done'
					) : (
						<Input type='file' accept='image/*' onChange={handleThumbnailInput} />
					)}
					<button onClick={handleUpload}>upload</button>
					<Input type='text' placeholder='Title' name='title' onChange={handleChangeInput} />
					<Desc placeholder='Description' name='description' rows={8} onChange={handleChangeInput} />
					<Input
						type='text'
						name='tags'
						placeholder='Separate the tags with commas.'
						onChange={handleTags}
					/>
					<Button disabled={videoProgress !== 100 || thumbnailProgress !== 100} onClick={handleSubmit}>
						Submit
					</Button>
				</Inner>
			</Wrapper>
		</Container>
	);
};

export default Upload;
