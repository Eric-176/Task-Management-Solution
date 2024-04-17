import { useEffect } from "react";
import { listType } from "./TodoApp";
import updateListIds from "./UpdateListIds";
import React from "react";

type SaveAndImportProps = {
  lists: listType[];
  setLists: (e: any) => void;
  activeList: number;
};

function SaveAndImport({ lists, setLists, activeList }: SaveAndImportProps) {
  useEffect(() => {
    const download = document.getElementById("saveButton") as HTMLAnchorElement;
    const blob1 = new Blob([JSON.stringify(lists[activeList])], {
      type: "text/plain",
    });
    download!.href = URL.createObjectURL(blob1);
  }, [lists, activeList]);

  function handleUpload() {
    const upload = document.getElementById("import") as HTMLInputElement;
    const file = upload.files![0];
    const fr = new FileReader();
    fr.addEventListener("load", () => {
      let listExists = false;
      lists.map((list: listType) => {
        if (JSON.parse(fr.result as string).title === list.title) {
          listExists = true;
          alert("List already exists");
        }
      });
      if (!listExists) {
        setLists((previousLists: listType[]) => {
          console.log(
            updateListIds([...previousLists, JSON.parse(fr.result as string)])
          );
          return updateListIds([
            ...previousLists,
            JSON.parse(fr.result as string),
          ]);
        });
      }
    });
    fr.readAsText(file);
  }

  return (
    <div className="downloadSavebuttons">
      <a href="#" id="saveButton" download="todo.json">
        Download List
      </a>
      <label id="downloadButton" htmlFor="import">
        Import List
      </label>
      <input onChange={handleUpload} type="file" id="import"></input>
    </div>
  );
}

export default SaveAndImport;
