import React from 'react'
import './ModifProfileForm.css'
import { Link } from 'react-router-dom'

function ModifProfileForm({ tags }) {
    return (
        <div>
            <form method='put' className='ModifProfileForm'>
                <label htmlFor='nickname'>Pseudo :</label>
                <input
                    type='text'
                    name='nickname'
                    id='nickname'
                    value='Asomar'
                    required
                />
                <label htmlFor='profile_pic'></label>
                <input
                    type='file'
                    name='profile_pic'
                    id='profile_pic'
                    accept='image/png, image/jpeg'
                />
                <label htmlFor='tags'>Tags :</label>
                <select name='tags' id='tags' defaultValue=''>
                    <option value=''>Choisissez un tag :</option>
                    {tags.map(tag => {
                        return (
                            <option key={`tag_${tags.id}`} value={tag.style}>
                                {tag.style}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor='bio'>Description :</label>
                <textarea name='bio' id='bio' cols='30' rows='10'></textarea>
                <Link to='/profiles'>
                    <input type='submit' id='submit' />
                </Link>
            </form>
        </div>
    )
}

export default ModifProfileForm
