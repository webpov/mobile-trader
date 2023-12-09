"use client";
import { useEffect, useMemo, useState } from "react";
import { getUTCDateString } from "../../../script/util/webhelp";


export function DailyLog({ state, calls }: any) {
  const [hydrationSafeLoad, s__hydrationSafeLoad] = useState(0);
  const triggerAddNote = () => {
    const notePrompt = prompt("Add note", "");
    if (!notePrompt) { return; }

    const theUnix = Date.now()
    const theDate = getUTCDateString(theUnix)
    calls.s__LS_notes([...(state.LS_notes || []), {
      unix: theUnix,
      date: theDate,
      msg: notePrompt,
    }]);
  };

  const localKeys = useMemo(() => {
    return [];
  }, [state.LS_notes]);
  const triggerClearNotes = () => {
    calls.s__LS_notes([]);
  };
  const triggerNoteClick = (index: number) => {
    const noteMsg = state.LS_notes[index];

    alert("Note #" + index + " \n\n" + noteMsg.msg);


  };

  useEffect(() => {
    s__hydrationSafeLoad(hydrationSafeLoad + 1);
  }, []);
  const YEAR_NUMBER = 2023

  const AddNoteButton = ({ fontSize = "tx-lg", isClearable = false }: any) => {
    return (
      <div className="flex flex-justify-between flex-align-start w-100">
        <button className={`tx-white ${fontSize || "tx-lgx"} opaci-chov--50 bg-w-10 bord-r-25 pa-4`}
          onClick={triggerAddNote}
        >
          + Add Note
        </button>
        {isClearable &&
          <button className={`tx-white ${fontSize || "tx-lgx"} opaci-chov--50 bg-w-10 bord-r-25 pa-2`}
            onClick={triggerClearNotes}
          >
            Clear
          </button>}

      </div>
    );
  };
  if (!hydrationSafeLoad) {
    return (<></>);
  }
  if ((!state.LS_notes) || (!!state.LS_notes && !state.LS_notes.length)) {
    return (<div className="mt-8">
      {/* <div className="pt-8 tx-bold-8 opaci-10 tx-ls-2 tx-lg"> Not <br /> Found</div> */}
      <AddNoteButton />
    </div>);
  }
  return (<>
    <div className=" w-100  flex-col gap-1">
      <div className="pb-2 w-100">
        <AddNoteButton isClearable={true} fontSize="tx-sm" />
      </div>
      {state.LS_notes.map((item: any, index: number) => {
        return (<div key={index} className=" w-100">
          <button className=" opaci-chov--50 bord-r-10 pa-3 w-100 noborder tx-white "
            onClick={() => triggerNoteClick(index)}
            style={{ background: "linear-gradient(45deg, #ffffff03, #ffffff11" }}
          >
            <div className="tx-bold-9  flex flex-justify-between">
              {/* <div className="tx-lg tx-altfont-1">{index + 1}</div> */}
              {/* <div>{item.unix}</div> */}
              <div className="flex-1 tx-start">{(`${item.msg}`).substring(0,20)}{item.msg.length > 20-1 ? "..." : ""}</div>
              <div className="tx-smd tx-altfont-1">{item.date.replace(YEAR_NUMBER,"")}</div>
              {/* <div>qweqwe</div> */}
            </div>
          </button>
        </div>);
      })}
    </div>
  </>);
}
