import React from 'react'
import { Link } from 'react-router-dom'

function ModifProfileForm({ tags }) {
    return (
        <div>
            <form method='put' className='flex-column space-size:l space:inset'>
                <label htmlFor='nickname' className='space:size space:stack'>
                    Pseudo :
                </label>
                <input
                    type='text'
                    name='nickname'
                    id='nickname'
                    placeholder='Asomar'
                    required
                    className='space:size space:stack underlined no-focus body-font'
                />
                <label htmlFor='profile_pic' className='space-size space:stack'>
                    Photo de profil :
                </label>
                <input
                    type='file'
                    name='profile_pic'
                    id='profile_pic'
                    accept='image/png, image/jpeg'
                    className='space-size space:stack body-font'
                />
                <label htmlFor='tags' className='space-size space:stack'>
                    Tags :
                </label>
                <select
                    name='tags'
                    id='tags'
                    defaultValue=''
                    className='space-size space:stack body-font'
                >
                    <option value='' className='body-font'>
                        Choisissez un tag :
                    </option>
                    {tags.map(tag => {
                        return (
                            <option
                                key={`tag_${tags.id}`}
                                value={tag.style}
                                className='body-font'
                            >
                                {tag.style}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor='bio' className='space-size space:stack'>
                    Description :
                </label>
                <textarea
                    name='bio'
                    id='bio'
                    cols='30'
                    rows='1'
                    className='space-size space:stack underlined no-focus body-font'
                ></textarea>
                <input
                    type='submit'
                    id='submit'
                    className='space-size:m space:inset-squish btn-animation btn-angles btn-shadow btn-borderless btn-color body-font'
                />
            </form>
        </div>
    )
}

export default ModifProfileForm
