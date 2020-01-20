import React from 'react'

const data = {
	profile_pic: 'https://www.jokeme.fr/images/Karadoc.jpg',
	nickname: '@Karadoc',
	tags: '#Gras #Taverne',
	media:
		'https://kaamelott.hypnoweb.net/photo/119/divers/ok/guide_des_episodes/Couvertures/livre_i/des_nouvelles_du_monde.jpg',
	likes: 69420,
	text:
		'Sur une échelle de 3 à 11, entre 3 et 5, ce barde est ignoble, entre 5 et 6, il nous fait saigner les oreilles, entre 6 et 8, on peut plus vivre autour de lui, et entre 8 et 11, on sort les tomates pourries pour lui lancer et le faire fuir de la taverne.'
}

const PostDisplay = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '90%',
				margin: '0 auto',
				background: '#eeefff',
				borderRadius: '10px'
			}}
			className='PostDisplay'
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
				<img
					style={{
						maxWidth: '64px',
						maxHeight: '64px',
						borderRadius: '50%'
					}}
					src={data.profile_pic}
					alt={data.nickname}
				/>
				<p
					style={{
						overflowWrap: 'anywhere',
						margin: 'auto',
						textAlign: 'center'
					}}
				>
					{' '}
					{data.nickname}
				</p>
				<p
					style={{
						overflowWrap: 'anywhere',
						margin: 'auto',
						textAlign: 'center'
					}}
				>
					{data.tags}
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
					src={data.media}
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
					{data.likes}
				</button>
				<p style={{ padding: '3%', textAlign: 'left' }}>{data.text}</p>
			</div>
		</div>
	)
}

export default PostDisplay
