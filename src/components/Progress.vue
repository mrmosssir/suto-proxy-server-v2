<template>
    <div class="progress">
        <div class="progress-content">
            <strong class="progress-content-name">Progress</strong>
            <span class="progress-content-value">{{ props.percent }}%</span>
        </div>
        <div class="progress-bar">
            <div class="progress-bar-current" :style="{ width: `${props.percent}%` }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    percent: number
};

const props = withDefaults(defineProps<Props>(), {
    percent: 0,
})

</script>

