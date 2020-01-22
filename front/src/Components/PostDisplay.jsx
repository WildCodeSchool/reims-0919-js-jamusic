import React from 'react'

const PostDisplay = ({
	profile_pic,
	nickname,
	tags,
	media,
	likes,
	text,
	loadProfile,
	profileId
}) => {
	return (
		<div
			className=''
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '90%',
				margin: '0.5% auto',
				background: '#eeefff',
				borderRadius: '10px'
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					margin: '3%',
					justifyContent: 'space-between'
				}}
				className='postHeader'
			>
				{}
				<img
					style={{
						maxWidth: '64px',
						maxHeight: '64px',
						borderRadius: '50%'
					}}
					src={profile_pic}
					alt={nickname}
					id={profileId}
					onClick={loadProfile}
				/>
				<p
					style={{
						overflowWrap: 'anywhere',
						margin: 'auto',
						textAlign: 'center'
					}}
				>
					{' '}
					{nickname}
				</p>
				<p
					style={{
						overflowWrap: 'anywhere',
						margin: 'auto',
						textAlign: 'center'
					}}
				>
					{tags}
				</p>
			</div>
			<div
				style={{ display: 'flex', flexDirection: 'column' }}
				className='postBody'
			>
				<img
					style={{
						maxWidth: '100%'
					}}
					src={media}
					alt='Média du post'
				/>
				<button
					style={{
						background: 'none',
						border: 'none',
						padding: '3%',
						alignSelf: 'start',
						textDecoration: 'none',
						outline: '0'
					}}
				>
					<span className='likesSymbol' role='img' aria-label='Likes'>
						❤️
					</span>{' '}
					{likes}
				</button>
				<p style={{ padding: '3%', textAlign: 'left' }}>{text}</p>
			</div>
		</div>
	)
}

export default PostDisplay
