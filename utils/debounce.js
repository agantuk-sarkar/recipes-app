export function debounce(functionToCall,delay){

    let timerId = null;

    return (...args)=>{

        clearTimeout(timerId);

        timerId = setTimeout(()=>{
            functionToCall(...args);
        },delay);
    }
}