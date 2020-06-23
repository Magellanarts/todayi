<template>
  <div class="hello">
    <div class="input-container">
      <h1>today,i</h1>

      <form novalidate @submit.prevent>
        <input
          type="text"
          v-model="entry.entryText"
          placeholder="What did you do today?"
          autofocus
          autocomplete="off"
        />
        <div class="date">{{ curDate }}</div>

        <div
          class="photoPlaceholder"
          :class="{ fullSize : entry.photoUploaded }"
          @click="triggerUploadDialog"
        >
          <span>add a photo</span>
          <img v-if="entry.imgSrc" :src="entry.imgSrc" />
        </div>
        <input
          type="file"
          name="photo"
          ref="photoUpload"
          id="photo"
          accept="image/png, image/jpeg"
          @change="handleUpload"
        />

        <button
          class="inactive save"
          :class="{active : entry.photoUploaded || entry.entryText}"
          type="submit"
          :disabled="entry.photoUploaded || entry.entryText ? false : true"
          @click="handleSave"
        >Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import {
  SAVE_ENTRY,
} from '@/store/types';

export default {
  data() {
    return {
      entry: {
        entryText: '',
        imgSrc: '',
        photoUploaded: false,
        photo: '',
        date: new Date(),
      },
    };
  },
  methods: {
    ...mapActions({
      save: SAVE_ENTRY,
    }),
    triggerUploadDialog() {
      this.$refs.photoUpload.click();
    },
    handleUpload(event) {
      const upload = event.target;
      const reader = new FileReader();

      reader.onload = () => {
        // get upload result
        const dataURL = reader.result;
        // set photoUploaded to true to style Upload button
        this.entry.photoUploaded = true;

        // insert uploaded photo
        this.entry.imgSrc = dataURL;
      };
      reader.readAsDataURL(upload.files[0]);
      // eslint-disable-next-line prefer-destructuring
      this.entry.photo = upload.files[0];
    },
    handleSave() {
      // TODO: what happens when you save?
      // upload photo to cloud

      const formData = new FormData();
      formData.append('file', this.entry.photo);
      formData.append('text', this.entry.entryText);
      formData.append('date', this.date);

      this.save(formData);
    },
  },
  computed: {
    curDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();

      return `${mm}/${dd}/${yyyy}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.hello {
  color: #8ea8c3;
}
.input-container {
  position: relative;
}

.photoPlaceholder {
  border: 1px dashed #8ea8c3;
  width: 280px;
  height: 80px;
  margin: auto;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;

  &.fullSize {
    height: 300px;
  }

  img {
    position: absolute;
    top: -25px;
    left: -25px;
    width: 350px;
    height: 350px;
  }
}

input {
  font-family: 'Crete Round', serif;
  border: none;
  outline: none;
  background: none;
  color: #8ea8c3;
  font-size: 1.25rem;
  transition: .2s linear;
  border-bottom: 1px dashed #8ea8c3;
  width: 280px;

  @media screen and (min-width: 768px) {
    width: 400px;
  }

  &::placeholder {
    color: rgba(#8ea8c3, .6);
    text-align: center;
  }


  &[type='file'] {
    display: none;
  }
}

.date {
  color: #8ea8c3;
  font-size: 0.825rem;
  padding-top: 0.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

.save {
  font-size: 0.825rem;
  border-radius: 4px;
  color: #8ea8c3;
  border: 1px dashed #8ea8c3;
  background: none;
  -webkit-appearance: none;
  padding: 0.75rem 1.5rem;
  text-align: center;
  cursor: not-allowed;

  &.active {
    cursor: pointer;
    background: #8ea8c3;
    color: #406e8e;
  }
}
</style>
