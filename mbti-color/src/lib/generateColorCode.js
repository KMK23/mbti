function generateRandomHex() {
  const num = Math.floor(Math.random() * 256);
  const hex = num.toString(16).padStart(2, "0").toUpperCase();
  return hex;
}

export default function generateColorCode() {
  const colorCode = `#${generateRandomHex()}${generateRandomHex()}${generateRandomHex()}`;
  return colorCode;
}

// 여러개의 함수들을 밖으로 빼고 싶을때는 default 뺴고 쓴다
// 이 파일을 가져왔을때 나온건 무조건 default 만 나온다
// 그래서 default 는 한개밖에 못쓴다
