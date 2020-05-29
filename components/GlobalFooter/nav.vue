<template>
  <div class="content">
    <div>
      <a
        v-for="n in logos"
        :key="n.id"
        :class="$style.logo"
        :href="n.url"
        target="_blank"
        rel="nofollow"
      >
        <img :src="$rewriteUrl(n.path)" :alt="n.title" />
      </a>
    </div>
    <div :class="$style.links">
      <a
        v-for="n in links"
        :key="n.id"
        :class="$style.link"
        :href="n.url"
        target="_blank"
        rel="nofollow"
      >
        {{ n.title }}
      </a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['logos', 'links'])
    }
};
</script>

<style lang="less" module>
.logo {
  display: inline-block;
  margin-right: 46px;
  padding: 12px 0;
  img {
    height: 30px;
  }
}
.links {
  padding-top: 16px;
  padding-bottom: 24px;
}
.link {
  color: #999999;
  display: inline-block;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-right: 24px;
}
</style>
