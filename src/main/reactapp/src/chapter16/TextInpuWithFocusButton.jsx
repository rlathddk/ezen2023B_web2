export default function TextInpuWithFocusButton(props){
    
    const inputElem = useRef(null);
    const onButtonClik = () =>{
        inputElem.current.focus();
    }
    return(<>
        <input ref={inputElem} type="text" />
        <button onClick={onButtonClik}>Focus the input</button>
    </>)
}