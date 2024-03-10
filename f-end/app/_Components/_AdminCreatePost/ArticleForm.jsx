'use client'
import { article, slug, text } from '@/public/assets/_index'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Tags from '../_AdminDashboard/Tags'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ArticleForm = () => {
    // states
    const [slugStatus, setSlugStatus] = useState('') // 'generated || 'generating'
    const [thumbnailFile, setThumbnailFile] = useState('')
    const [articleData, setArticleData] = useState({
        thumbnail: "",
        title: "",
        slug: "",
        description: ""
    })
    const [dataURL, setDataURL] = useState('')


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            changeSlug()
        }, 900);
        // Cleanup function to clear the timeout if component unmounts or if title changes again
        return () => clearTimeout(timeoutId);
    }, [articleData.title])

    function handleInput(e) {
        const { name, value } = e.target
        setArticleData(prevData => ({ ...prevData, [name]: value }));
        if (name === 'title' && value.trim() != '') {
            setSlugStatus('generating')
        }
    }

    function changeSlug() {
        articleData.title.trim() != "" ? setSlugStatus('generated') : setSlugStatus('')
        const slugValue = articleData.title.split(' ').join('-');
        setArticleData({ ...articleData, slug: slugValue })
    }

    // handle file drag and drop
    function uploadImage() {
        const imgFile = document.getElementById("article-thumbnail").files[0]
        let imgLink = URL.createObjectURL(imgFile)
        setThumbnailFile(imgLink)
        const fileReader = new FileReader()
        fileReader.onload = function () {
            const imgData = fileReader.result
            // const blob = new Blob([fileReader.result], { type: imgFile.type })
            setArticleData({ ...articleData, thumbnail: imgData })
            // showImage()

        }
        fileReader.readAsArrayBuffer(document.getElementById("article-thumbnail").files[0])
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

    function handleSubmitForm(e) {
        e.preventDefault()
        const formData = e['target']
        // get form values
        const validateThumbnail = formData['article-thumbnail'].files[0]
        const validateTitle = formData['article-title'].value
        const validateDescription = formData['article-description'].value
        // warning messages for validations
        const warnThumbnail = 'Please add a thumbnail for article'
        const warnTitle = 'Please add title'
        const warnDesc = 'Please add description'
        // function to show warning
        function notify(message, id) {
            toast.warn(message, {
                toastId: id, autoClose: 1800, closeOnClick: true, pauseOnHover: false
            },
            )
        }
        // show warning logic
        const showWarning = (!validateThumbnail) ? notify(warnThumbnail, 1) :
            (validateTitle.trim() === '') ? notify(warnTitle, 2) :
                (validateDescription.trim() === '') ? notify(warnDesc, 3) :
                    publishArticle(validateThumbnail, validateTitle, validateDescription)
        showWarning  // function for submitting form if no validation error

    }

    function clearFormData() {
        setArticleData({
            thumbnail: "",
            title: "",
            slug: "",
            description: ""
        })
        setThumbnailFile('')
        document.getElementById('thumbail-view').innerHTML = `<h1 class='text-xl'>Drag and Drop here</h1>
        <span class='span-line text-center'>OR</span>
        <h1 class='text-[#7262EC] text-xl'>Browse Files</h1>`
        document.getElementById('drop-area').style.border = 'initial'

    }
    async function publishArticle(thumbnail, title, desc,) {
        const formData = new FormData()
        formData.append('thumbnail', thumbnail)
        formData.append('title', title)
        formData.append('description', desc)
        formData.append('slug', articleData.slug)
        try {
            const response = await fetch('http://localhost:3001/api/article', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                // Handle non-2xx status codes:
                const errorData = await response.json();
                throw new Error(`API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }
            clearFormData()
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    }

    return (
        <div className='my-1'>
            <form autoComplete='off' method='post' onSubmit={handleSubmitForm} encType='multipart/form-data'>
                <div className='flex flex-wrap justify-center gap-10 items-center '>
                    {/* file input */}
                    <div className='flex flex-col gap-1'>
                        <span>Thumbnail</span>
                        <label id='drop-area' htmlFor="article-thumbnail" className='thumbnail-label w-[500px] h-[190px] max-[520px]:w-[300px]  bg-blur !border-dashed !border-[#7262EC] flex justify-center items-center cursor-pointer rounded-[20px]'
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
                    <div className='flex flex-col gap-10 w-full'>
                        {/* Title */}
                        <div className='flex flex-col gap-1' >
                            <label htmlFor="article-title">Title</label>
                            <div className='ac-t flex input-text' onClick={borderActive} onBlur={borderInActive}>
                                <Image src={text} width={30} alt='title' />
                                <input type="text" name='title' id='article-title' placeholder='Meta to reveal its plan' value={articleData.title} onChange={handleInput} />
                            </div>
                        </div>
                        {/* slug */}
                        <div className='flex flex-col gap-1'>
                            <div className='flex justify-between items-end'>

                                <label htmlFor="article-slug">Slug</label>
                                {/* slug generated tag */}
                                <div className='auto-gen-tag'>
                                    {
                                        slugStatus === 'generated' ?
                                            <Tags backgC='#B1FAB0' textC='#03D100' actionText='Auto-Generated' /> : slugStatus === 'generating' ?
                                                <Tags backgC='#FFD99F' textC='#D47800' actionText='Generating Slug...' /> : ''
                                    }
                                </div>
                            </div>
                            <div className='ac-s flex input-text' onClick={borderActive} onBlur={borderInActive}>
                                <Image src={slug} width={30} htmlFor='article-slug' alt='auto generated slug' />
                                <input onChange={handleInput} type="text" name='slug' readOnly id='article-slug' value={articleData.slug} contentEditable={false} className='hover:cursor-default' />
                            </div>
                        </div>
                    </div>
                </div>
                {/* description */}
                <div className='mt-5'>
                    <label htmlFor="article-description" >Description</label>
                    <div className='ac-t flex input-text' onClick={borderActive} onBlur={borderInActive}>
                        <div>
                            <Image src={text} width={30} alt='title' />
                        </div>
                        <textarea onChange={handleInput} name='description' id='article-description' rows="5" value={articleData.description} />
                    </div>
                </div>
                {/* Submit Button */}
                <ToastContainer />

                <div className='flex justify-center items-center mt-2'>
                    <input type="submit" value='Publish' id='publish-article' className='text-white px-5 py-2 bg-[#7262EC] rounded-[5px] hover:cursor-pointer hover:bg-[#6152d3]' />
                </div>
            </form>

        </div>
    )
}

export default ArticleForm