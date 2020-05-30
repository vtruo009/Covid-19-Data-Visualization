<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  props: {
    showLegend: {
      Type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: this.showLegend,
          labels: {
            fontColor: "black",
            fontSize: 18
          }
        }
      }
    };
  },
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
    console.log(this.showLegend);
  }
};
</script>

<style></style>
