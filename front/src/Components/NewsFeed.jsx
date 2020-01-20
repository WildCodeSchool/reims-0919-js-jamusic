import React from 'react'
import PostDisplay from './PostDisplay'

const data = [
	{
		picture: 'https://www.jokeme.fr/images/Karadoc.jpg',
		nickname: '@Karadoc',
		tags: '#Gras #Taverne',
		media:
			'https://kaamelott.hypnoweb.net/photo/119/divers/ok/guide_des_episodes/Couvertures/livre_i/des_nouvelles_du_monde.jpg',
		likes: 69420,
		comment:
			'Sur une échelle de 3 à 11, entre 3 et 5, ce barde est ignoble, entre 5 et 6, il nous fait saigner les oreilles, entre 6 et 8, on peut plus vivre autour de lui, et entre 8 et 11, on sort les tomates pourries pour lui lancer et le faire fuir de la taverne.'
	},
	{
		picture:
			'https://i.pinimg.com/236x/01/ba/d2/01bad2f10881ae2319623e1b62450ff4--fan-art-wallpaper.jpg',
		nickname: '@Ragsomar',
		tags: '#Synthwave #Electro',
		media:
			'https://cdn.pixabay.com/photo/2019/01/19/13/12/synthwave-3941721_960_720.jpg',
		likes: 1026,
		comment: "Quelqu'un aurait une playlist Synthwave à me conseiller ?"
	}
]
const NewsFeed = () => {
	return (
		<div>
			{data.map(post => (
				<PostDisplay
					key={post.nickname}
					profile_pic={post.picture}
					nickname={post.nickname}
					tags={post.tags}
					media={post.media}
					likes={post.likes}
					comment={post.comment}
				/>
			))}
		</div>
	)
}

export default NewsFeed
