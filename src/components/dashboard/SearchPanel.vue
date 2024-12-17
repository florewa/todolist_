<script setup>
import VSelect from '@/components/VSelect.vue'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  selectedOption: {
    type: String,
    default: 'All',
  },
  options: {
    type: Array,
    required: true,
  },
  icon: String,
})

const emit = defineEmits(['update:value', 'update:selectedOption'])

const handleInput = (event) => {
  emit('update:value', event.target.value)
}
</script>

<template>
  <div class="page-menu">
    <div class="page-search">
      <input
        type="text"
        class="search-input"
        :value="value"
        @input="handleInput"
        placeholder="Search note..."
      />
      <img :src="icon" alt="search" class="search-icon" />
    </div>
    <div class="page-select">
      <VSelect
        :model-value="selectedOption"
        @update:model-value="
          (newValue) => emit('update:selectedOption', newValue)
        "
        :options="options"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.page-menu {
  display: flex;
  gap: 16px;
}

.page-search {
  flex: 1;
  position: relative;

  .search-input {
    width: 100%;
    height: 40px;
    padding: 0 40px 0 16px;
    border: 2px solid #6c63ff;
    border-radius: 8px;
    background: var(--input-background);
    color: var(--text-color);
    font-size: 14px;
    outline: none;

    &::placeholder {
      font-size: 16px;
      font-weight: 400;
      color: var(--placeholder-color);
    }
  }

  .search-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
  }
}

.page-select {
  flex: 0 0 93px;
}
</style>