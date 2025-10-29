import { createContext, useState } from "react";
import runChat from "../config/gemini";
import Showdown from "showdown";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false); 
    const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) => {
        setTimeout(function() {
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts(prev => [...prev,input])
            setRecentPrompt(input);
            response = await runChat(input);
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 1; i<responseArray.length; i++){
            if (i===0 || i%2!==1){
                newResponse += responseArray[i]
            }
            else{
                newResponse += "<b>" + responseArray[i] + "</b>" 
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length ; i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord + " ");
        }

    // // Create a converter instance
    // const converter = new Showdown.Converter();

    // // Markdown input
    // const markdownText = response;

    // // Convert to HTML
    // const html = converter.makeHtml(markdownText);
    // setResultData(html);
    // console.log(html);

    // console.log(html); // Outputs: <h1 id="hello-markdown">Hello, Markdown!</h1>
        setLoading(false);
        setInput(""); 
    }  

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider