import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMjH2u7MdHMfoe0MxxjYsMeBPKq0tW1Zg",
  authDomain: "mbti-project-50b8c.firebaseapp.com",
  projectId: "mbti-project-50b8c",
  storageBucket: "mbti-project-50b8c.appspot.com",
  messagingSenderId: "575450297390",
  appId: "1:575450297390:web:71fdabff39be0960fe5bbf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName, order, lq) {
  const collect = collection(db, collectionName);
  // 컬렉션 정보 = 컬렉션 함수안에 db, collectionName 파라미터 받고
  let q = query(collect, orderBy(order, "desc"), limit(10));
  if (lq) {
    q = query(collect, orderBy(order, "desc"), startAfter(lq), limit(10));
  }
  // desc : 내림차순
  // order 라는 정렬을 하기 위해 query가 필요했음 orderBy를 쓰고 그안에 파라미터를 order, 그다음 뭐로 정렬할껀지
  const querySnapshot = await getDocs(q);
  const lastQuery = querySnapshot.docs[querySnapshot.docs.length - 1];
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  //   debugger;

  return { resultData, lastQuery };
}

async function addDatas(collectionName, dataObj) {
  const collect = collection(db, collectionName);

  // id값 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  // 날짜 생성
  const time = new Date().getTime();
  // 추가할 데이터 객체에 필요한 필드 정보 추가
  dataObj.id = lastId;
  dataObj.createdAt = time;
  dataObj.updatedAt = time;
  //문서에 데이터 객체 저장
  const result = await addDoc(collect, dataObj);
  return result;
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

export { getAllDatas, addDatas };
