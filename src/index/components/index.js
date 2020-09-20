export default {
  data() {
    return {
      startY: '',
      endY: '',
      scrollLocation: 0,
      lastPosition: 0,
      contentList: [2014, 2015, 2016,
        2017, 2018, 2019,
        2020, 2021, 2022, 2023, 2024, 2025,
        2026, 2027, 2028
      ],
      selectedIndex: 0 //当前第几个被选中
    };
  },
  mounted() {
  },
  methods: {
    tap() {
      console.log(1);
    },
    selectStart(e) {
      const { touches = [] } = e;
      const { clientY } = touches[0];
      this.startY = clientY;
      const selectContent = this.$refs['select_content'];
      const translates = window.getComputedStyle(selectContent, null).transform
      this.lastPosition = parseFloat(translates.substring(6).split(',')[5])
    },
    selectEnd(e) {
      console.log()
    },
    selectMove(e) {
      const { touches = [] } = e;
      const { clientY } = touches[0];
      this.endY = clientY;
      const listRef = this.$refs['liList0'][0]
      this.scrollLocation = this.lastPosition + this.endY - this.startY
      const maxDistance = listRef.offsetHeight * (this.contentList.length - 1);
      // 边界条件判断
      if (this.scrollLocation > 0) {
        this.scrollLocation = 0
      } else if (Math.abs(this.scrollLocation) > maxDistance) {
        this.scrollLocation = -maxDistance
      }
      // 获取当前滚动到第几个元素
      this.selectedIndex = Math.round(Math.abs(this.scrollLocation / listRef.offsetHeight))
    },

  }
};
