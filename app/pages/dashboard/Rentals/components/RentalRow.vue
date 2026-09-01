<script setup lang="ts">
const props = defineProps<{
  rent: any
  inventory: any[]
}>()

const getCarDetails = (carId: string) => {
  return props.inventory.find(c => c.id === carId)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return '#2ecc71'
    case 'Active': return '#3563E9'
    case 'Pending': return '#f1c40f'
    case 'Cancelled': return '#e74c3c'
    default: return '#90A3BF'
  }
}
</script>

<template>
  <tr>
    <td class="order-id">#{{ rent.id }}</td>

    <td class="car-info">
      <div class="car-flex">
        <img
          :src="getCarDetails(rent.carId)?.images[0]"
          class="car-thumb"
        />
        <span>{{ getCarDetails(rent.carId)?.name }}</span>
      </div>
    </td>

    <td>
      <div class="customer">
        <strong>{{ rent.customerName }}</strong>
        <span>{{ rent.email }}</span>
      </div>
    </td>

    <td class="dates">
      {{ rent.rentDate }} <br />
      <small>to {{ rent.returnDate }}</small>
    </td>

    <td class="price">${{ rent.totalPrice }}.00</td>

    <td>
      <span
        class="status-pill"
        :style="{
          backgroundColor: getStatusColor(rent.status) + '15',
          color: getStatusColor(rent.status)
        }"
      >
        {{ rent.status }}
      </span>
    </td>

    <td>
      <button class="btn-more">•••</button>
    </td>
  </tr>
</template>