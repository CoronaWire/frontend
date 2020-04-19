// Central Source of Truth for the theming of the application

const GlobalTheme = {
  applicationGeneralColor: 'rgb(3, 13, 21)',
  applicationWhiteColor: 'white',
  applicationTextColor: 'black',
  fontColor: 'rgb(0, 0, 0)',
  navigationBarBackgroundColor: 'white',
  buttonBackgroundColor: 'transparent',
  applicationInputColor: 'black',
  generalApplication: {
    fontFamily: 'Muli',
    borderRadius: '5px',
    articleTitleFont: 'oldEnglish',
    articleSummaryFont: 'franklinLT',
  },
  adminLoginStyling: {
    buttonInputWidth: '300px',
    textSize: '12px',
    buttonColor: 'black',
  },
  mainPageStyling: {
    offWhiteBackgroundColor: '#FAFAFA',
    whiteBackgroundColor: '#FFF',
    lightGreyColor: '#F5F7FA'
  }, 
  leftMenuStyling: {
    backgroundColor: 'white',
  },
  dashboardStyling: {
    marginTop: '30px',
  },
  generalColors: {
    lightBlue: '#4AB7FF',
    neonGreen: '#39ff14',
    darkBlue: '#2A265F',
    darkerNavy: '#02053B',
    allWhite: '#FFFFFF',
    darkRed: '#CC0000',
    greenTurquoise: '#00E880',
    lightDarkGrey: '#DBDBDB',
  },
  newsColors: {
    pink: '#FF335F',
    navy: '#242A49',
    ivory: '#F5F5F3',
    darkGrey: '#4F536B',
    midGrey: '#9194A4',
    lightGrey: '#E9EAED',
    white: '#ffffff',
  },
	fontWeight: {
		bold: 700,
		semiBold: 600,
    medium: 500,
    regular: 400,
	},
  navigationBar: {},
  singleNewsComponent: {
    newsDataHeight: 72,
    padding: '15px'
  }
};


export default GlobalTheme;
