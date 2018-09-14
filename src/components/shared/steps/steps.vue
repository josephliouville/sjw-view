<script>
export default {
  props: {
    value: [String, Number],
    steps: {
      type: Array,
      default() {
        return []
      }
    },
    stepClick: Function
  },
  methods: {
    handleClick(index) {
      this.stepClick && this.stepClick(index)
    }
  },
  render() {
    const { steps, value } = this
    return (
      <div class="yl-steps">
        <el-steps active={value} align-center>
          {steps.map((step, index) => {
            return (
              <el-step
                title={step.title}
                description={step.description}
                {...{ nativeOn: { click: () => this.handleClick(index) } }}
              />
            )
          })}
        </el-steps>
      </div>
    )
  }
}
</script>
