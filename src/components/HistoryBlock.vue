<template>
	<div class="history-block" v-bind:class="{ 'disabled': !record.createdDate }" v-on:click="onClick">
		<span v-if="record.createdDate"> 
			Slot {{index}}: {{record.fileName}} ({{record.markers.length}} records), created at {{date}}
		</span>

		<span v-else>Slot {{index}}: Empty</span>
	</div>
</template>

<script>
	export default {
		props: {
			index: {
        type: Number,
        required: true
      },
			record: Object
		},

		computed: {
			date() {
				if (!this.record.createdDate) return null;

				let date = new Date(this.record.createdDate);

				return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
			}
		},

		methods: {
			onClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss">
	@import "@/assets/theme.scss";

	.history-block {
		border: 1px solid $gray-400;
		padding: 20px;
		border-radius: 5px;
		cursor: pointer;

		&.disabled {
			border-color: $gray-200;
			color: $gray-400;
			cursor: not-allowed;
		}

		&:not(.disabled):hover {
			border-color: map-get($theme-colors, success);
		}

	}
</style>