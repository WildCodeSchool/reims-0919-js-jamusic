import React from 'react'

function Header() {
	return (
		<div className='borderHead width100'>
			<h1
				className='space-size:l space:inset-squish title-color title-font'
				style={{ fontVariant: 'small-caps' }}
			>
				ja<span style={{ fontVariant: 'normal' }}>M</span>usic
			</h1>
		</div>
	)
}

export default Header
