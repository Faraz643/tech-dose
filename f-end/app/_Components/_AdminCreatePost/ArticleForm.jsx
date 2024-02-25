'use client'
import Image from 'next/image'
import React, { useState } from 'react'
const ArticleForm = () => {
    // states
    const [thumbnailFile, setThumbnailFile] = useState('')
    // handle file drag and drop

    function uploadImage(e) {
        // console.log(document.getElementById("article-thumbnail").files[0])
        let imgLink = URL.createObjectURL(e.target.files[0])
        setThumbnailFile(imgLink)
        document.getElementById('thumbail-view').textContent = ''
        document.getElementById('drop-area').style.border = '0'

    }

    function handleDrop(e) {
        e.preventDefault()
        document.getElementById("article-thumbnail").files = e.dataTransfer.files
        uploadImage()

    }


    return (
        <div className='my-5'>
            <form>
                <div className='flex'>
                    {/* file input */}
                    <label id='drop-area' htmlFor="article-thumbnail" className='thumbnail-label w-[500px] h-[200px] bg-blur !border-dashed !border-[#7262EC] flex justify-center items-center cursor-pointer rounded-[20px]'
                        onDragOver={(e) => e.preventDefault()}
                        onDropCapture={handleDrop}>


                        <input type="file" id='article-thumbnail' accept='image/*' multiple={false} hidden
                            onChange={uploadImage} />


                        {/* show selected file area*/}
                        <div id='thumbail-view' className='w-[90%] h-[90%] text-center flex flex-col gap-6' style={{ backgroundImage: `url(${thumbnailFile})` }}>
                            <h1 className='text-xl'>Drag and Drop here</h1>
                            <span className='span-line text-center'>OR</span>
                            <h1 className='text-[#7262EC] text-xl'>Browse Files</h1>
                        </div>


                    </label>
                    <div className='flex flex-col'>
                        {/* Title */}
                        {/* slug */}
                    </div>
                </div>
                <div>
                    {/* description */}
                </div>
            </form>
        </div>
    )
}

export default ArticleForm