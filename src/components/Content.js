/*global chrome*/
import React,{useRef} from 'react'
import html2canvas from 'html2canvas'

export default function Content(){
    
    let newUrl

    const [meme, setMeme] = React.useState({
        topText : "",
        bottomText : "",
        url: "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F000%2F091%2FTrollFace.jpg"
    })

    const memeRef = useRef(null)

    function getImage(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            newUrl = tabs[0].url
            console.log(newUrl)
            setMeme(prevState =>{
                return{
                    ...prevState,
                    url : newUrl
                }
            })
        })
        
    }

    function textChange(event){
        const{name, value} = event.target
        setMeme(prevState =>{
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    function downloadMeme() {
        const memeDiv = memeRef.current;
    
        // Use html2canvas to capture the div content as an image
        html2canvas(memeDiv, { allowTaint: true, useCORS: true }).then(canvas => {
          // Convert the canvas to a data URL
          const dataURL = canvas.toDataURL("image/png");
    
          // Create a temporary link element for downloading
          const downloadLink = document.createElement("a");
          downloadLink.href = dataURL;
          downloadLink.download = "meme.png";
    
          // Trigger a click event on the link to start the download
          downloadLink.click();
        });
      }

    return(
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form-input"
                    name="topText"
                    value={meme.topText}
                    onChange={textChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={textChange}
                />
            </div>

            <div className="meme" ref={memeRef}>
                <img src={meme.url} 
                className="meme-img" 
                alt=''
                />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>

            <div className="btn-container">
                <button className="image-btn" onClick={getImage}>Get Image</button>
                <button className="download-btn" onClick={downloadMeme}>Download Meme</button>
            </div>
        </main>
    )
}