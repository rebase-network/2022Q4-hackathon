export default {
  name: 'WebNavbar',
  data() {
    return {
      appMenus: [
        {href: '/', text: 'HOME', disabled: false},
        {href: '/course', text: 'COURSE', disabled: false},
        {href: '/major', text: 'MAJOR', disabled: false},
        {href: '/market', text: 'MARKET', disabled: false}
        // {href: '/docs', text: 'HALL', disabled: false},
      ],
      languages: [
        { 'text': 'English', 'value': 'en_US', disabled: false },
        { 'text': '简体中文', 'value': 'zh_CH', disabled: false },
        { 'text': 'Français', 'value': 'fr_FR', disabled: true },
        { 'text': '日本語', 'value': 'ja_JP', disabled: true }
      ],
    }
  }
}