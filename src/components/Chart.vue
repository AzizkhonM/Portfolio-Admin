<script setup>
import { defineProps } from "vue";

/*    study: store.LIST_STUDY.length,
      work: store.LIST_WORK.length,
      skills: store.LIST_SKILLS.length,
      services: store.LIST_SERVICES.length,
      projects: store.LIST_PROJECTS.length,
      socials: store.LIST_SOCIALS.length,
      comments: store.LIST_COMMENTS.length,
      posts: store.LIST_POST.length, */

const props = defineProps(["data"]);

const options = {
  theme: "light2",
  animationEnabled: true,
  title: {
    text: "Portfolio's Statistics",
  },
  data: [
    {
      type: "pie",
      indexLabel: "{label} ({y})",
      yValueFormatString: "#,##0",
      toolTipContent: "<span style='\"'color: {color};'\"'>{label}</span> {y}(#percent%)",
      dataPoints: [
        { label: "Studied places", y: props.data.study },
        { label: "Workplaces", y: props.data.work },
        { label: "Skills", y: props.data.skills },
        { label: "Services", y: props.data.services },
        { label: "Projects", y: props.data.projects },
        { label: "Social media pages", y: props.data.socials },
        { label: "Comments", y: props.data.comments },
        { label: "Posts", y: props.data.posts },
      ],
    },
  ],
};

const styleOptions = {
  width: "100%",
  height: "500px",
};
</script>

<template>
  <CanvasJSChart :options="options" :styles="styleOptions" />
</template>

<style lang="scss" scoped></style>
