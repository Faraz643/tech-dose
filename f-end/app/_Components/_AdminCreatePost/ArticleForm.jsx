'use client'
import { slug, text } from '@/public/assets/_index'
import Image from 'next/image'
import React, { useState } from 'react'
import Tags from '../_AdminDashboard/Tags'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ArticleForm = () => {
    // states
    const [thumbnailFile, setThumbnailFile] = useState('')
    // handle file drag and drop

    function notify() {
        toast('React Notification')
    }

    function uploadImage() {
        // console.log(document.getElementById("article-thumbnail").files[0])
        let imgLink = URL.createObjectURL(document.getElementById("article-thumbnail").files[0])
        setThumbnailFile(imgLink)
        document.getElementById('thumbail-view').textContent = ''
        document.getElementById('drop-area').style.border = '0'

    }

    function handleDrop(e) {
        e.preventDefault()
        document.getElementById("article-thumbnail").files = e.dataTransfer.files
        uploadImage()

    }


    function borderActive(e) {
        e.stopPropagation();
        e.preventDefault();

        // Apply styles or perform actions on the clicked element
        e.currentTarget.style.border = '3px solid #7262ec';

        // Search for and focus on the input element
        const inputElement = e.currentTarget.querySelector('input')
        if (inputElement) {
            inputElement.focus();
        }
    }

    function borderInActive(e) {
        e.stopPropagation()
        e.preventDefault()
        e.currentTarget.style.border = '3px solid rgb(108, 108, 108)'
        const inputElement = e.currentTarget.querySelector('.input-area');
        if (inputElement) {
            inputElement.blur();
        }

    }


    function onSubmitForm(e) {
        e.preventDefault()
        const formData = e['target']
        const validateThumbnail = formData['article-thumbnail'].files[0]
        const validateTitle = formData['article-title'].value
        const validateDescription = formData['article-description'].value

        const warnThumbnail = toast.warn('Please add a thumbnail for article')
        const warnTitle = toast.warn('Please add title')
        const warnDesc = toast.warn('Please add description')
        const showWarning = (!validateThumbnail) ? warnThumbnail : (validateTitle.length === 0) ? warnTitle : (validateDescription.length === 0) ? warnDesc : ''
        showWarning

        // else condition to submit form and use toast.promise to display message

        // console.log((!(!validateThumbnail)), validateTitle, validateDescription)
        // console.log('form submitted')
        // add validations- required fields
        // when submit button is clicked , create an alert (pop-up) message for > page reload will clear form fields ||and confirm submission message
    }

    return (
        <div className='my-1'>
            <ToastContainer />
            <form autoComplete='off' method='post' onSubmit={onSubmitForm}>
                <div className='flex gap-10'>
                    {/* file input */}
                    <div className='flex flex-col gap-1'>
                        <span>Thumbnail</span>
                        <label id='drop-area' htmlFor="article-thumbnail" className='thumbnail-label w-[500px] h-[190px] bg-blur !border-dashed !border-[#7262EC] flex justify-center items-center cursor-pointer rounded-[20px]'
                            onDragOver={(e) => e.preventDefault()}
                            onDropCapture={handleDrop}>


                            <input type="file" id='article-thumbnail' accept='image/*' multiple={false} hidden
                                onChange={uploadImage} />


                            {/* show selected file area*/}
                            <div id='thumbail-view' className='w-[100%] h-[90%] text-center flex flex-col gap-6' style={{ backgroundImage: `url(${thumbnailFile})` }}>
                                <h1 className='text-xl'>Drag and Drop here</h1>
                                <span className='span-line text-center'>OR</span>
                                <h1 className='text-[#7262EC] text-xl'>Browse Files</h1>
                            </div>


                        </label>
                    </div>
                    <div className='flex flex-col gap-10'>
                        {/* Title */}
                        <div className='flex flex-col gap-1 w-[300px]' >
                            <label htmlFor="article-title">Title</label>
                            <div className='ac-t flex input-text' onClick={borderActive} onBlur={borderInActive}>
                                <Image src={text} width={30} alt='title' />
                                <input type="text" id='article-title' placeholder='Meta to reveal its plan' />

                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex justify-between items-end'>

                                <label htmlFor="article-slug">Slug</label>
                                <div className='auto-gen-tag'>
                                    <Tags backgC='#B1FAB0' textC='#03D100' actionText='Auto-Generated' />
                                </div>
                            </div>
                            <div className='ac-s flex input-text' onClick={borderActive} onBlur={borderInActive}>
                                <Image src={slug} width={30} htmlFor='article-slug' alt='auto generated slug' />
                                <input type="text" readOnly id='article-slug' value='meta-to-reveal-its-big-plan' contentEditable={false} />

                            </div>
                        </div>
                        {/* slug */}
                    </div>
                </div>
                <div className='mt-5'>
                    {/* description */}
                    <label htmlFor="article-description" >Description</label>
                    <div className='ac-t flex input-text' onClick={borderActive} onBlur={borderInActive}>
                        <div>
                            <Image src={text} width={30} alt='title' />
                        </div>
                        <textarea name='area-text' id='article-description' rows="5" ></textarea>
                        {/* <input type="text" placeholder='Meta to reveal its plan' /> */}
                    </div>
                </div>
                <div className='flex justify-center items-center mt-2'>
                    <input type="submit" value='Publish' id='publish-article' className='text-white px-5 py-2 bg-[#7262EC] rounded-[5px] hover:cursor-pointer hover:bg-[#6152d3]' />
                </div>
            </form>
        </div>
    )
}

export default ArticleForm