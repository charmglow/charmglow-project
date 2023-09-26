// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#876553',
  },
  components: {
    Layout: {
      headerBg: '#fff',
      lightTriggerBg: '#876553',
    },
    Menu: {},
    Dropdown: {},
  },
};

export default theme;
