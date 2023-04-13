
// notion api 통해서 태그 색상을 끌고오면 폰트 색상과 맞지 사용자 경험에 좋지 않기 때문에 
// notion에서 가져온 색상을 투명도 0.3를 적용해서 렌더링하는 함수

export const lightThemeTagColor = {
  'red': 'rgba(255, 0, 0, 0.3)',
  'gray': 'rgba(128, 128, 128, 0.3)',
  'orange': 'rgba(255, 128, 0, 0.3)',
  'pink': 'rgba(255, 0, 255, 0.3)',
  'blue': 'rgba(0, 0, 255, 0.3)',
  'default': 'rgba(192, 192, 192, 0.3)',
  'yellow': 'rgba(255, 255, 0, 0.3)',
  'brown': 'rgba(165,42,42, 0.3)',
  'purple': 'rgba(128,0,128, 0.3)',
  'green': 'rgba(0,128,0, 0.3)',
}

export const darkThemeTagColor = {
  'red': 'rgba(255, 0, 0, 0.5)',
  'gray': 'rgba(128, 128, 128, 0.5)',
  'orange': 'rgba(255, 128, 0, 0.5)',
  'pink': 'rgba(255, 0, 255, 0.5)',
  'blue': 'rgba(0, 0, 255, 0.5)',
  'default': 'rgba(192, 192, 192, 0.5)',
  'yellow': 'rgba(255, 255, 0, 0.5)',
  'brown': 'rgba(165,42,42, 0.5)',
  'purple': 'rgba(128,0,128, 0.5)',
  'green': 'rgba(0,128,0, 0.5)',
}