import { useState } from 'react';
import classes from './MusicalModal.module.css';

export default function MusicalModal({id}){

    const [file, setFile] = useState();

    const handleFileChange = (e)=>{
        setFile(e.target.files[0]);
    }


    const handleUpload = async () => {
        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }
        const formData = new FormData();
        formData.append("id", id); // ID 추가
        formData.append("file", file); // 파일 추가
        try {
            const response = await fetch("https://muu-t.onrender.com/admin/updateMusical", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("업로드 성공!");
            } else {
                alert("업로드 실패!");
            }
        } catch (error) {
            console.error("업로드 중 오류 발생:", error);
            alert("업로드 중 오류가 발생했습니다.");
        }
    };

    return(
        <>
            <form className={classes.detailMain}>
                <p>파일은 <span style={{color:'#fa2828'}}>.xls, .xlsx 형식만</span> 가능합니다.</p>
                <p>파일은 <span style={{color:'#fa2828'}}>한 개만</span> 등록 가능합니다.</p><br/>
                <input type="file" className={classes.input_btn} onChange={handleFileChange}></input>
                <button type="button" className={classes.upload_btn} onClick={handleUpload}>업로드</button>
            </form>
        </>
    )
}