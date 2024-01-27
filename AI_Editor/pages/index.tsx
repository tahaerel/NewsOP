import { Action, ActionIconMap, DefaultActions } from "@/types/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import {FiArrowRight, FiCloud, FiFeather, FiFile, FiFileText, FiGlobe, FiGrid, FiHash, FiMinus, FiPlus, FiShuffle, FiType, FiZap} from "react-icons/fi"
import Markdown from 'react-markdown'
export default function Home() {

  const useCases = [
    {
      role: "News Editor", 
      global: `
      Haber editörlerinin haber yazmasına yardımcı olan bir asistansın. Kullanıcının talimatlarını dikkatlice izleyin.`,
      documents: [{
        name: "NewsOP",
        document: ``,
        action: "",
        context: ``,
        output: ` `
    }]
  }]

  const [ucIndex, setucIndex] = useState(0)

  // let interval;
  // useEffect(() => {
  //   if(interval === undefined){
  //     interval = setInterval(()=>{
  //       setucIndex((ucIndex +1) % useCases.length)
  //     }, 5000);
  //   }

  //   // return () => {
  //   //   clearInterval(interval);
  //   // }
  // }, [])

  const renderIcon = (task_id) => {
    let task : Action;
    for (let i = 0; i < DefaultActions.length; i++) {
      const t = DefaultActions[i];
      if(t.id == task_id){
        task = t
        break
      }
    }
    
    let icon = task.id
    if(!ActionIconMap.hasOwnProperty(task.id)){
      icon = 'custom'
    }
    const Icon = ActionIconMap[icon];
    return (<div>
      <div className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg mr-8 ">
      <Icon width="1.125em" height="1.125em" className="mr-2 text-gray-800" />{task.name}</div>
      <div className="mt-4">{task.prompt}</div>
      </div>);
  };

  function tabClass(current, active){
    let c = 'mr-4 mb-4 px-8 py-4 cursor-pointer items-center rounded-lg '
    if(current == active){
        c += ' bg-sky-100 text-blue-800 font-semibold'
    }else{
        c += ' bg-gray-50 hover:bg-gray-200 text-gray-600 '
    }
    return c
  }

  const [output, setOutput] = useState("");

  let interval;
  function handleTabClick(uc){
    // clearInterval(interval);
    setucIndex(uc)
    // const words = useCases[0].documents[uc].output?.split(" ")
    // let _output = "";
    // for (let index = 0; index < words.length; index++) {
    //   const word = words[index];
    //   // setOutput(output+ " "+ word)
    //   _output = _output + " "+ word
    //   setTimeout(()=>{setOutput(_output)}, 1000)
    // }
    // const words = useCases[0].documents[uc].output?.split(" ");
    // let currentIndex = 0;
    // setOutput(words[currentIndex])
    // interval = setInterval(() => {
    //   if (currentIndex < words.length -1) {
    //     setOutput(prevOutput => prevOutput + " " + words[currentIndex]);
    //     currentIndex++;
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 50);
  }

  useEffect(() => {
    const words = useCases[0].documents[ucIndex].output?.split(" ");
    let currentIndex = 0;
    setOutput(words[currentIndex])
    interval = setInterval(() => {
      if (currentIndex < words.length -1) {
        setOutput(prevOutput => prevOutput + " " + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    }
  }, [ucIndex]);

  return (<>
  <header className="animate-header-slide-down-fade sticky top-0 border-b border-transparent backdrop-blur-sm transition duration-200 ease-in-out z-10">
  <div className="mx-auto w-full max-w-5xl px-6 md:max-w-7xl">
    <div className="mx-auto hidden h-[58px] w-full items-center justify-between transition duration-500 ease-in-out md:flex">
      <div className="flex lg:w-[225px]">
        <Link className="focus-visible:ring-slate-7 py-1 outline-none transition duration-150 ease-in-out focus-visible:ring-2 text-2xl font-semibold" aria-label="Resend" href="/">NewsOP</Link>
      </div>
      <div className="flex gap-4">
        <Link className="inline-flex h-10 select-none items-center justify-center gap-0 rounded-lg border border-gray-800 hover:border-sky-900 hover:bg-sky-900 bg-gray-900 text-white px-4 text-sm font-semibold outline-none transition transition duration-150 duration-200 ease-in-out ease-in-out" href="/editor">NewsOP'u Dene</Link>
        {/* <Link className="inline-flex h-10 select-none items-center justify-center gap-0 rounded-lg border border-gray-300 hover:border-gray-200 hover:bg-gray-200 bg-white px-4 text-sm font-semibold outline-none transition transition duration-150 duration-200 ease-in-out ease-in-out" href="https://github.com/pagebrain/newsop" target="_blank">Github</Link> */}
      </div>
    </div>
  </div>
</header>

<main
      className={`mx-auto max-w-6xl`}>



      <div className="my-12 text-center">
        <h1 className='text-6xl font-semibold text-gray-900'>NewsOP</h1>
        {/* ChatGPT workbench for power users */}
        <h2 className='text-2xl mt-4 text-gray-600'>New Generation News Operations</h2>
        {/* <h2 className='text-4xl font-semibold mt-4 text-gray-600'>SQL workbench equivalent of ChatGPT</h2> */}
        
        <p className="text-2xl text-gray-700 py-8">NewsOP; yapay zeka teknolojisiyle donatılmış, haber redaksiyon süreçlerini optimize eden bir çözümdür. Anlık veri analizi, dil işleme ve öğrenme yetenekleri sayesinde editörlere iş yükünü azaltarak hız, doğruluk ve verimlilik katkısı sağlar. Geleceğin habercilik dünyasına yönelik bu çözüm, haber editörlük deneyimini dönüştürmeyi hedefler.</p>
        
        <Link className="inline-block text-2xl justify-center mt-4 py-4 px-6 transition-colors border border-gray-800 hover:border-sky-900 hover:bg-sky-900 bg-gray-900 text-white rounded-lg mr-4" href="/editor">NewsOP'u Dene</Link>
       {/* <Link className="inline-block text-2xl justify-center mt-4 py-4 px-6 transition-colors border border-gray-300 hover:border-gray-200 hover:bg-gray-200 bg-white rounded-lg" href="https://github.com/pagebrain/newsop" target="_blank">Github</Link> */}
      
      </div>
      {/* <div className="my-24 text-center">
      Start separate chat threads
      </div> */}
{}
      
      {}

      <footer className="mb-40"></footer>
    </main>
  </>
  )
}
