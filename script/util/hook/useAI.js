import React, { useState, useEffect, useMemo } from 'react';
import { useMap, MapOrEntries, useMediaQuery, useCopyToClipboard } from 'usehooks-ts';

export const AI_BASE = `
act as a professional bitcoin market researcher
analyze this simulated data and make a report:
include trend direction and most levels to watch

each object property has an array,
each array represents candlestick chart data with the latest closing prices separated by a length of time specified by the key name
your task is to generate the report including all timeframes in the json object

\n\n candles data:
`
export const useAI = (selectedTimeframe,copyToClipboard=false) => {
  
  const [theTimeframe, s__theTimeframe] = useState(selectedTimeframe)
  const [AIdata, s__AIdata] = useState({})
  

  
  const [clipbloardValue, clipbloard__do] = useCopyToClipboard()
  const askAI = (aTimeframe,data) => {
    let verbose = {
      "1m": "1 minutes between prices",
      "3m": "3 minutes between prices",
      "5m": "5 minutes between prices",
      "15m": "15 minutes between prices",
      "30m": "30 minutes between prices",
      "1h": "1 hour between prices",
      "4h": "4 hours between prices",
      "1d": "1 day between prices",
      "1w": "1 week between prices",
    }
    let newPrompt = AIdata
    newPrompt[verbose[aTimeframe.toLowerCase()]] = ([...data]).splice(400,499)
    s__AIdata(newPrompt)
    // console.log("Prompt: ", newPrompt)
    if (copyToClipboard) {
      clipbloard__do(AI_BASE + JSON.stringify(newPrompt))
    }
    return newPrompt
}



  return {
    askAI,
    theAIContextTimeframe: theTimeframe,
    setAITimeframe: s__theTimeframe
  }
}