import React from 'react'
import './PostDisplay.css'

const PostDisplay = ({
	profile_pic,
	nickname,
	tags,
	media,
	likes,
	text,
	profileId,
	loadAnotherProfile,
	date
}) => {
	const formattedDate = new Date(date)

	return (
		<div className='PostDisplay'>
			<div className='postHeader'>
				<img src={profile_pic} alt={nickname} />
				<p>{nickname}</p>
				<p>{tags}</p>
			</div>
			<div className='postBody'>
				{media ? (
					<img
						src={media}
						alt='Média du post'
						id={profileId}
						onClick={loadAnotherProfile}
					/>
				) : (
					<></>
				)}
				<div className='postInfo'>
					<button>
						<span
							className='likesSymbol'
							role='img'
							aria-label='Likes'
						>
							❤️
						</span>{' '}
						{likes}
					</button>
					<p>
						{new Intl.DateTimeFormat('default', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
							second: '2-digit'
						}).format(formattedDate)}
					</p>
				</div>
				<p>{text}</p>
			</div>
		</div>
	)
}

export default PostDisplay
