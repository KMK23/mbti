import React, { useEffect, useState } from "react";
import styles from "./New.module.css";
import { generatePath, Link } from "react-router-dom";
import MBTISelect from "../components/MBTISelect";
import ColorInput from "../components/ColorInput";
import generateColorCode from "../lib/generateColorCode";
import { addDatas } from "../lib/firebase";

const INITAIL_VALUE = {
  mbti: "",
  colorCode: "",
};

function New(props) {
  const [formValue, setFormValue] = useState(INITAIL_VALUE);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (name, value) => {
    setFormValue((prevFormValue) => {
      return { ...prevFormValue, [name]: value };
    });
  };

  const handleRandomClick = () => {
    const nextColorCode = generateColorCode();
    handleChange("colorCode", nextColorCode);
  };

  const handleSave = async () => {
    const { mbti, colorCode } = formValue;
    if (mbti.length < 4) {
      alert("MBTI를 선택해주세요");
      return false;
    }
    if (colorCode == "") {
      alert("컬러코드를 입력해주세요");
      return false;
    }
    setIsSubmit(true);
    const result = await addDatas("mbtiColor", formValue);
    if (result) {
      alert("성공적으로 MBTI가 등록되었습니다.");
      setFormValue(INITAIL_VALUE);
    } else {
      alert("MBTI 등록 실패!!!! 관리자에게 문의하세요");
    }
    setIsSubmit(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerHeading}>새 컬러 등록하기</h1>
        <Link className={styles.cancel} to="/">
          <img src="/images/x.svg" className={styles.cancelIcon} />
        </Link>
      </header>
      <section className={styles.section}>
        <h4 className={styles.sectionHeading}>MBTI</h4>
        <MBTISelect
          MBTIValue={formValue.mbti}
          handleChange={(newMbti) => handleChange("mbti", newMbti)}
        />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>
          컬러
          <button className={styles.random} onClick={handleRandomClick}>
            <img className={styles.repeatIcon} src="/images/repeat.svg" />
          </button>
        </h2>
        <ColorInput
          colorCodeValue={formValue.colorCode}
          handleChange={(newColorCode) =>
            handleChange("colorCode", newColorCode)
          }
        />
      </section>
      <button
        className={styles.submit}
        onClick={handleSave}
        disabled={isSubmit}
      >
        컬러 등록
      </button>
    </div>
  );
}

export default New;
