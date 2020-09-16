
const first = [
  "시끄러운말많은",
  "푸른",
  "적색",
  "조용한",
  "웅크린",
  "백색",
  "지혜로운",
  "용감한",
  "날카로운",
  "욕심많은",
  ]
  
  const second = [
  "늑대",
  "태양",
  "양",
  "매",
  "황소",
  "불꽃",
  "나무",
  "달빛",
  "말",
  "돼지",
  "하늘",
  "바람",
  "악어", "개미 핥기", "아르마딜로", "오소리", "박쥐", "비버", "버팔로", "낙타", "카멜레온", "치타", "다람쥐", "친칠라", "가마우지", "코요테", "까마귀", "공룡", "돌고래", "오리", "코끼리", "여우", "족제비", 
  "개구리",
  "기린",
  "고퍼",
  "곰",
  "고슴도치",
  "하마",
  "하이에나",
  "자칼",
  "아이 벡스",
  "이구아나",
  "코알라",
  "크라켄",
  "여우",
  "표범",
  "라이거",
  "라마",
  "밍크",
  "원숭이",
  "일각 고래",
  "냥 고양이",
  "오랑우탄",
  "수달",
  "팬",
  "펭귄",
  "오리너구리, 호박",
  "토끼",
  "너구리",
  "코뿔소",
  "양",
  "말괄량이",
  "스컹크",
  "다람쥐",
  "거북",
  "해마",
  "늑대",
  "오소리"
  ]
  
  const getName=(arr)=>{
    const arr_length = arr.length
    const index = Math.floor(Math.random(arr_length)*arr_length)
  
    return arr[index]
  }
  
  const createName=()=>{
    const firstName = getName(first);
    const secondName = getName(second);

    console.log(`${firstName} ${secondName}`)
  
    return `${firstName} ${secondName}`
  }
  
  export default createName;