import React, { useEffect, useState } from 'react'

export default function useThumbnail({
    multiple
} : {
    multiple?: boolean
}) {
    const [source, setSource] = useState<string|null>(null)
    const [sources, setSources] = useState<string[]>([])

    const clearSources = () => {
        if(multiple) {
            sources.forEach(()=>sources.pop())
            sources.pop()
            setSources(sources)
        } else {
            setSource(null)
        }
    }

    function createThumbnail(file: any) {
        let reader = new FileReader();
        reader.onload = function() {
            if(multiple) {
                const src = [...sources]
                // @ts-ignore
                src.push(this.result)
                setSources([...src])
            } else {
                // @ts-ignore
                setSource(this.result)
            }
        };
        reader.readAsDataURL(file);
    }
    const fileChange =  function(e:any) {
        sources.forEach(()=>sources.pop())
        sources.pop()
        setSources(sources)

        const allowedTypes = ['png', 'jpg', 'jpeg', 'gif'];
        var files = e.target.files;
        console.log({ e, files });
        var filesLen = files.length;
        var imgType;
        for (var i = 0 ; i < filesLen ; i++) {
            imgType = files[i].name.split('.');
            imgType = imgType[imgType.length - 1];
            if(allowedTypes.indexOf(imgType.toLowerCase()) != -1) {
                createThumbnail(files[i]);
            }
        }
    };

    const HxH = (e:any) => {

    }

    useEffect(()=>{
        console.log({ sources });
    },[sources])

    return {
        source,
        sources,   
        fileChange,
        clearSources
    }
}
