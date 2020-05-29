<template>
  <section :class="$style.service">
    <PersonalLeft :tab-index="4" />
    <div :class="$style.right">
      <a-tabs :default-active-key="tabsIndex">
        <a-tab-pane key="1" :tab="$t('user.info')">
          <div :class="$style.info">
            <div style="position: relative;">
              <div
                :class="$style.info_title"
                style="height: 90px; vertical-align: top;"
              >
                {{ $t('user.avatar') }}
              </div>
              <div v-if="isEdit" :class="$style.info_left_head">
                <vueCropper
                  ref="cropper3"
                  :auto-crop="example3.autoCrop"
                  :auto-crop-width="example3.autoCropWidth"
                  :auto-crop-height="example3.autoCropHeight"
                  :fixed-box="example3.fixedBox"
                  :img="example3.img"
                />
              </div>
              <div v-if="!isEdit" :class="$style.auto_head">
                <img
                  v-if="user.headPic"
                  v-lazy="user.headPic"
                  width="90"
                  height="90"
                  alt="获取比特币"
                />
                <img
                  v-if="!user.headPic"
                  src="~assets/img/default_head.png"
                  width="90"
                  height="90"
                  alt="获取比特币"
                />
              </div>
              <div v-if="isEdit" :class="$style.upload_btn">
                {{ $t('user.changeAvatar') }}
                <input id="head_file" type="file" @change="changeImg" />
              </div>
              <div v-if="isEdit" :class="$style.upload_text">
                {{ $t('user.tips') }}
              </div>
            </div>
            <div :class="$style.line" />
            <div>
              <div :class="$style.info_title">{{ $t('user.nickname') }}</div>
              <a-input
                v-model="user.nickName"
                :disabled="!isEdit"
                :style="!isEdit ? 'border: 0;' : ''"
                :placeholder="isEdit ? '不超过20个字符' : ''"
                size="large"
              />
            </div>
            <div :class="$style.line" />
            <div>
              <div :class="$style.info_title">{{ $t('user.sex') }}</div>
              <span>
                {{
                  isEdit
                    ? ''
                    : user.sex == 0
                    ? $t('user.secret')
                    : user.sex == 2
                    ? $t('user.male')
                    : $t('user.female')
                }}
              </span>
              <a-radio-group v-if="isEdit" v-model="user.sex">
                <a-radio :value="2">{{ $t('user.male') }}</a-radio>
                <a-radio :value="1">{{ $t('user.female') }}</a-radio>
                <a-radio :value="0">{{ $t('user.secret') }}</a-radio>
              </a-radio-group>
            </div>
            <div :class="$style.line" />
            <div>
              <div :class="$style.info_title">{{ $t('user.intro') }}</div>
              <a-textarea
                v-model="user.autograph"
                :disabled="!isEdit"
                :style="!isEdit ? 'border: 0;' : ''"
                :placeholder="isEdit ? '请输入简介信息（不超过200个字）' : ''"
                :autosize="{ minRows: 2, maxRows: 6 }"
              />
            </div>
            <div :class="$style.line" />
            <div :class="$style.save" @click="save">
              {{ isEdit ? $t('user.save') : $t('user.modify') }}
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('user.safe')">
          <div :class="$style.info">
            <div style="position: relative;">
              <div :class="$style.info_title">{{ $t('user.tel') }}</div>
              <div :class="$style.text">
                <span>{{ user.phoneStatus ? user.phone : '-' }}</span>
                <br />
              </div>
              <div
                v-if="!user.phoneStatus"
                :class="$style.btn"
                @click="visible1 = true"
              >
                {{ $t('user.binding') }}
              </div>
            </div>
            <div style="position: relative;">
              <div :class="$style.info_title">{{ $t('user.email') }}</div>
              <div :class="$style.text">
                <span>{{ user.emailStatus ? user.email : '-' }}</span>
                <br />
              </div>
              <div :class="$style.btn" @click="visible2 = true">
                {{
                  user.emailStatus == 1 ? $t('user.modify') : $t('user.binding')
                }}
              </div>
            </div>
            <div style="position: relative;">
              <div :class="$style.info_title">{{ $t('user.password') }}</div>
              <div :class="$style.text">
                {{ $t('user.changePassword') }}
              </div>
              <div :class="$style.btn" @click="visible3 = true">
                {{ $t('user.modify') }}
              </div>
            </div>
            <div style="position: relative;">
              <div :class="$style.info_title">{{ $t('user.kyc') }}</div>
              <div :class="$style.text">
                <span>
                  {{
                    user.authenticationState
                      ? $t('user.certificated')
                      : user.authenticationState == 2
                      ? $t('user.review')
                      : $t('user.uncertified')
                  }}
                </span>
                <br />
                {{ $t('user.wallet') }}
              </div>
              <div :class="$style.btn" @click="visible4 = true">
                {{
                  !user.authenticationState
                    ? $t('user.certificate')
                    : $t('user.view')
                }}
              </div>
            </div>
            <div style="position: relative;">
              <div :class="$style.info_title">{{ $t('user.txPassword') }}</div>
              <div :class="$style.text">
                <span>
                  {{
                    user.transactionPasswordStatus
                      ? $t('user.seted')
                      : $t('user.unset')
                  }}
                </span>
                <br />
                {{ $t('user.withdrawal') }}
              </div>
              <div :class="$style.btn" @click="visible5 = true">
                {{
                  user.transactionPasswordStatus
                    ? $t('user.modify')
                    : $t('user.set')
                }}
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-modal
      v-model="visible2"
      :ok-text="$t('user.confirm')"
      :cancel-text="$t('user.cancel')"
      :title="`${$t('user.binding')} ${$t('user.email')}`"
      width="400px"
      style="font-weight: bold; color: #4D4D4D; font-size: 18px; z-index: 1999;text-align: center;"
      @ok="submitForm"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          label=""
          style="text-align: left;"
        >
          <a-input
            v-if="!user.emailStatus"
            v-decorator="[
              'email',
              { rules: [{ required: true, message: '请输入邮箱地址' }] }
            ]"
            placeholder="请输入邮箱地址"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          style="margin-top: -20px;text-align: left;"
          label=""
        >
          <a-select
            v-if="user.emailStatus"
            v-decorator="[
              'email',
              { rules: [{ required: true, message: '请选择验证方式' }] }
            ]"
            :default-value="user.email"
            placeholder="请选择验证方式"
          >
            <a-select-option :value="user.email">
              {{ '原绑定邮箱: ' + user.email }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 22 }" style="text-align: left;">
          <a-row :gutter="12">
            <a-col :span="18">
              <a-input
                v-decorator="[
                  'code',
                  { rules: [{ required: true, message: '请输入验证码' }] }
                ]"
                placeholder="请输入验证码"
              />
            </a-col>
            <a-col :span="2">
              <a-button type="primary" html-type="submit" @click="sendpassCode">
                {{ showText }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="visible6"
      :ok-text="$t('user.confirm')"
      :cancel-text="$t('user.cancel')"
      title="修改绑定邮箱"
      width="400px"
      style="font-weight: bold; color: #4D4D4D; font-size: 18px; z-index: 1999;text-align: center;"
      @ok="submitForm"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          label=""
          style="text-align: left;"
        >
          <a-input
            v-decorator="[
              'remail',
              { rules: [{ required: true, message: '请输入新邮箱地址' }] }
            ]"
            placeholder="请输入新邮箱地址"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 22 }" style="text-align: left;">
          <a-row :gutter="12">
            <a-col :span="18">
              <a-input
                v-decorator="[
                  'recode',
                  { rules: [{ required: true, message: '请输入验证码' }] }
                ]"
                placeholder="请输入验证码"
              />
            </a-col>
            <a-col :span="2">
              <a-button type="primary" html-type="submit" @click="sendpassCode">
                {{ showText }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="visible3"
      :ok-text="$t('user.confirm')"
      :cancel-text="$t('user.cancel')"
      :title="`${$t('user.modify')} ${$t('user.password')}`"
      width="400px"
      style="font-weight: bold; color: #4D4D4D; font-size: 18px; z-index: 1999;text-align: center;"
      @ok="updatePwd"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          label=""
          style="text-align: left;"
        >
          <a-input
            v-decorator="[
              'pwd',
              { rules: [{ required: true, message: '请输入原密码' }] }
            ]"
            type="password"
            placeholder="请输入原密码"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          label=""
          style="text-align: left;"
        >
          <a-input
            v-decorator="[
              'new_pwd',
              { rules: [{ required: true, message: '请输入新密码' }] }
            ]"
            type="password"
            placeholder="请输入新密码"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          label=""
          style="text-align: left;"
        >
          <a-input
            v-decorator="[
              're_pwd',
              { rules: [{ required: true, message: '请确认新密码' }] }
            ]"
            type="password"
            placeholder="请确认新密码"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="visible4"
      :ok-text="$t('user.confirm')"
      :cancel-text="$t('user.cancel')"
      :title="$t('user.kyc')"
      width="600px"
      style="font-weight: bold; color: #4D4D4D; font-size: 18px; z-index: 1999;text-align: center;"
      @ok="authentication"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          label=""
          style="text-align: left;"
        >
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入真实姓名' }] }
            ]"
            :disabled="user.authenticationState"
            placeholder="请输入真实姓名"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          label=""
          style="text-align: left;"
        >
          <a-input
            v-decorator="[
              'cardNo',
              { rules: [{ required: true, message: '请输入身份证号' }] }
            ]"
            :disabled="user.authenticationState"
            placeholder="请输入身份证号"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 10 }"
          :wrapper-col="{ span: 14 }"
          :label="$t('user.front')"
          style="text-align: left;"
        >
          <div :class="$style.upload_bg">
            <div
              :class="$style.upload_icon1"
              :style="
                positiveImg ? 'background-image: url(' + positiveImg + ')' : ''
              "
            >
              <div :class="$style.upload_card_add" />
              <input
                id="positiveImg"
                :class="$style.upload_card_input"
                type="file"
                @change="uploadCard('positiveImg')"
              />
            </div>
          </div>
        </a-form-item>
        <a-form-item
          :label-col="{ span: 10 }"
          :wrapper-col="{ span: 14 }"
          :label="$t('user.back')"
          style="text-align: left;"
        >
          <div :class="$style.upload_bg">
            <div
              :class="$style.upload_icon2"
              :style="backImg ? 'background-image: url(' + backImg + ')' : ''"
            >
              <div :class="$style.upload_card_add" />
              <input
                id="backImg"
                :class="$style.upload_card_input"
                type="file"
                @change="uploadCard('backImg')"
              />
            </div>
          </div>
        </a-form-item>
        <a-form-item
          :label-col="{ span: 10 }"
          :wrapper-col="{ span: 14 }"
          :label="$t('user.hand')"
          style="text-align: left;"
        >
          <div :class="$style.upload_bg">
            <div
              :class="$style.upload_icon3"
              :style="holdImg ? 'background-image: url(' + holdImg + ')' : ''"
            >
              <div :class="$style.upload_card_add" />
              <input
                id="holdImg"
                :class="$style.upload_card_input"
                type="file"
                @change="uploadCard('holdImg')"
              />
            </div>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="visible5"
      :footer="null"
      :ok-text="$t('user.confirm')"
      :cancel-text="$t('user.cancel')"
      :title="`${$t('user.set')} ${$t('user.txPassword')}`"
      width="400px"
      style="font-weight: bold; color: #4D4D4D; font-size: 18px; z-index: 1999;text-align: center;"
    >
      <img src="~assets/img/personal/q_code.png" width="200" height="200" alt="比特币获得" />
      <div style="margin-top: 20px;">{{ $t('user.linke2') }}</div>
    </a-modal>
  </section>
</template>
<script>
import PersonalLeft from '~/components/PersonalLeft';
import { mapGetters } from 'vuex';
const vueCropper = resolve => resolve(require('vue-cropper'));
export default {
    head: {
        script: [
            {
                src: '/gt.js'
            }
        ]
    },
    components: {
        PersonalLeft,
        vueCropper
    },
    data() {
        return {
            user: {},
            positiveImg: '',
            backImg: '',
            holdImg: '',
            example3: {
                img: '',
                autoCrop: true,
                autoCropWidth: 90,
                autoCropHeight: 90,
                fixedBox: true
            },
            visible1: false, // 绑定手机
            visible2: false, // 绑定邮箱
            visible3: false, // 修改密码
            visible4: false, // 实名认证
            visible5: false, // 设置交易密码
            visible6: false, // 修改绑定邮箱
            form: this.$form.createForm(this),
            typeCode: 'zh-cn',
            isEdit: false,
            timer: 0,
            tabsIndex: '1',
            // 验证码的控制
            countDownNumber: 60,
            showText: this.$t('user.captcha'),
            // 提交按钮
            submitBtnLoading: false
        };
    },
    computed: {
        ...mapGetters(['loggedUser'])
    },
    mounted() {
        this.user = JSON.parse(JSON.stringify(this.loggedUser));
    },
    methods: {
        changeImg: function() {
            const file = document.getElementById('head_file').files[0];
            // 创建读取文件的对象
            const reader = new FileReader();
            let imgFile;
            const that = this;
            reader.onload = function(e) {
                imgFile = e.target.result;
                that.example3.img = imgFile;
            };
            reader.readAsDataURL(file); // 正式读取文件
        },
        save: function() {
            if (this.isEdit) {
                const params = {
                    headPic: '',
                    nickName: this.user.nickName,
                    sex: this.user.sex,
                    autograph: this.user.autograph
                };
                this.$refs.cropper3.startCrop(); // 开始截图
                this.$refs.cropper3.stopCrop(); // 停止截图

                if (this.example3.img === '') {
                    this.$personal.updateInfo(params).then(
                        res => {
                            if (res.success) {
                                this.$store.commit('setLoggedUser', this.user);
                                this.$message.success('更新成功！');
                                this.isEdit = false;
                                // this.$router.push('/personal');
                            }
                        },
                        err => {
                            console.log(err.message);
                        }
                    );
                }

                // 获取截图的base64 数据
                this.$refs.cropper3.getCropData(data => {
                    this.$personal.uploadBase64({ base64: data }).then(res => {
                        if (res.success) {
                            params.headPic = res.data;
                            this.$personal.updateInfo(params).then(
                                re => {
                                    if (re.success) {
                                        this.user.headPic = params.headPic;
                                        this.$store.commit('setLoggedUser', this.user);
                                        this.$message.success('更新成功！');
                                        this.isEdit = false;
                                        // this.$router.push('/personal');
                                    }
                                },
                                err => {
                                    this.$message.error(err.message + '，更新失败！');
                                }
                            );
                        }
                    });
                });
            } else {
                this.isEdit = true;
            }
        },
        sendpassCode() {
            // 通过极验发送验证码
            this.form.validateFields(['email', 'remail'], (err, values) => {
                if (!err) {
                    this.btnLoading = true;
                    this.initGeetestEmail(window.initGeetest, {
                        smsType: 4,
                        email: this.visible6 ? values.remail : values.email,
                        areaCode: this.countryCode,
                        done: () => {
                            this.countDwon();
                        }
                    });
                }
            });
        },
        countDwon() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.countDownNumber--;
                if (this.countDownNumber === 0) {
                    clearInterval(this.timer);
                    this.showText = this.$t('user.captcha');
                    this.btnLoading = false;
                } else {
                    this.showText = this.countDownNumber + 'S后重新获取';
                }
            }, 1000);
        },
        submitForm() {
            this.form.validateFields(
                ['email', 'code', 'remail', 'recode'],
                (err, values) => {
                    if (!err) {
                        this.btnLoading = true;
                        const params = {
                            email: this.visible6 ? values.remail : values.email,
                            validateCode: this.visible6 ? values.recode : values.code,
                            type: 4,
                            origin: 3,
                            operateType: 4,
                            typeCode: this.typeCode
                        };
                        this.$personal.bindEmail(params).then(
                            res => {
                                if (res.success) {
                                    if (!this.user.emailStatus) {
                                        // 未绑定邮箱
                                        this.user.email = params.email;
                                        this.user.emailStatus = true;
                                        this.$store.commit('setLoggedUser', this.user);
                                        this.$message.success('邮箱绑定成功！');
                                        this.visible2 = false;
                                    } else if (this.visible6) {
                                        // 绑定过且已验证成功一次，现绑定新邮箱
                                        this.user.email = params.email;
                                        this.$store.commit('setLoggedUser', this.user);
                                        this.$message.success('邮箱修改成功！');
                                        this.visible6 = false;
                                    } else {
                                        // 已绑定过，验证一次原邮箱
                                        this.visible2 = false;
                                        this.visible6 = true;
                                    }
                                }
                            },
                            err => {
                                console.log(err);
                            }
                        );
                    }
                }
            );
        },
        updatePwd() {
            this.form.validateFields(['pwd', 'new_pwd', 're_pwd'], (err, values) => {
                if (!err) {
                    if (values.new_pwd !== values.re_pwd) {
                        this.$message.error('两次输入密码不一致！');
                        return;
                    }
                    const params = {
                        oldPwd: this.$md5(values.pwd),
                        newPwd: this.$md5(values.re_pwd)
                    };
                    this.$personal.updateByPwd(params).then(res => {
                        if (res.success) {
                            this.$message.success('密码修改成功！');
                            this.visible3 = false;
                        }
                    });
                }
            });
        },
        uploadCard: function(name) {
            const file = document.getElementById(name).files[0];
            const fileSize = (file.size / (1024 * 1024)).toFixed(2);
            if (fileSize > 3) {
                this.$message.error('上传文件大小超过限制！');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            let xhr = new XMLHttpRequest();
            xhr.open(
                'post',
                'https://apioperate.btc123.com/api/library/noAuth/fileupload'
            );
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const resultValue = xhr.responseText;
                    const data = JSON.parse(resultValue);
                    if (name === 'positiveImg') this.positiveImg = data.data;
                    else if (name === 'backImg') this.backImg = data.data;
                    else this.holdImg = data.data;
                    xhr = null;
                }
            };
            xhr.send(formData);
        },
        authentication: function() {
            this.form.validateFields(['name', 'cardNo'], (err, values) => {
                if (!err) {
                    if (!this.positiveImg) {
                        this.$message.error('必须上传身份证正面照！');
                        return;
                    }
                    if (!this.backImg) {
                        this.$message.error('必须上传身份证背面照！');
                        return;
                    }
                    if (!this.holdImg) {
                        this.$message.error('必须上传手持身份证照！');
                        return;
                    }
                    const params = {
                        backImg: this.backImg,
                        certNo: values.cardNo,
                        holdImg: this.holdImg,
                        positiveImg: this.positiveImg,
                        typeCode: this.typeCode,
                        userId: this.user.id,
                        userName: values.name
                    };
                    this.$personal.saveIdentityInfo(params).then(res => {
                        if (res.success) {
                            this.user.authenticationState = true;
                            this.$store.commit('setLoggedUser', this.user);
                            this.$message.success('资料上传成功，请等待工作人员审核。');
                            this.visible4 = false;
                        }
                    });
                }
            });
        }
    }
};
</script>
<style lang="less" module>
.service {
  width: 1280px;
  margin: 20px auto;
  .right {
    width: 1000px;
    height: 1100px;
    background-color: #fff;
    margin-left: 20px;
    display: inline-block;
    vertical-align: top;
    padding: 44px;
    color: #333;
    .title {
      font-size: 20px;
      font-weight: bold;
      position: relative;
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: #eee;
      margin-top: 10px;
    }
    .info {
      &:last-child {
        color: #4d4d4d;
      }
      .info_title {
        vertical-align: middle;
        display: inline-block;
        height: 90px;
        line-height: 90px;
        width: 100px;
      }
      input,
      textarea {
        width: 500px;
        background: rgba(255, 255, 254, 1);
        border-radius: 4px;
        font-size: 12px;
        line-height: 26px;
        padding-left: 10px;
      }
      .text {
        position: absolute;
        display: inline-block;
        top: 34px;
        span {
          font-size: 14px;
          font-weight: bold;
        }
      }
      .btn {
        position: absolute;
        right: 0;
        top: 31px;
        width: 64px;
        height: 28px;
        border: 1px solid rgba(214, 214, 214, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 26px;
        color: #4d4d4d;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          background-color: #ff9000;
          color: #fff;
        }
      }
    }
    .info_left_head {
      width: 210px;
      height: 210px;
      display: inline-block;
    }
    .auto_head {
      width: 90px;
      height: 90px;
      background-color: #efefef;
      border-radius: 45px;
      background-size: 100% 100%;
      position: absolute;
      left: 100px;
      top: 0;
      overflow: hidden;
    }
    .upload_btn {
      width: 70px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: #4d4d4d;
      font-weight: bold;
      border: 1px solid #d6d6d6;
      border-radius: 4px;
      display: inline-block;
      vertical-align: top;
      margin-top: 60px;
      margin-left: 60px;
      position: relative;
      &:hover {
        background: #d6d6d6;
        color: #fff;
      }
      input {
        position: absolute;
        left: 0;
        top: -1px;
        width: 98px;
        height: 28px;
        border-radius: 4px;
        opacity: 0;
        cursor: pointer;
      }
    }
    .upload_text {
      width: 340px;
      font-size: 12px;
      text-align: left;
      vertical-align: middle;
      margin-top: -100px;
      display: inline-block;
      margin-left: -74px;
    }
    .save {
      width: 150px;
      height: 40px;
      margin: 50px auto;
      background: #f79522;
      border-radius: 4px;
      line-height: 38px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: #fe5134;
      }
    }
  }
}
i {
  cursor: pointer;
  &:hover {
    color: #f79522;
  }
}
.upload_bg {
  width: 160px;
  height: 110px;
  background: rgba(245, 245, 245, 1);
  border-radius: 8px;
  cursor: pointer;
  margin-left: 20px;
  .upload_icon1 {
    width: 128px;
    height: 88px;
    position: relative;
    top: 11px;
    left: 16px;
    background-size: 100% 100%;
    background-image: url('~assets/img/personal/id_card.png');
  }
  .upload_icon2 {
    width: 128px;
    height: 88px;
    position: relative;
    top: 11px;
    left: 16px;
    background-size: 100% 100%;
    background-image: url('~assets/img/personal/id_card2.png');
  }
  .upload_icon3 {
    background-image: url('~assets/img/personal/person_head_card.png');
    width: 110px;
    height: 93px;
    position: relative;
    top: 9px;
    left: 25px;
    background-size: 100% 100%;
  }
  .upload_card_add {
    background-image: url('~assets/img/personal/upload.png');
    width: 32px;
    height: 32px;
    position: absolute;
    left: 48px;
    top: 28px;
  }
  .upload_card_input {
    width: 128px;
    height: 88px;
    background: rgba(245, 245, 245, 1);
    border-radius: 8px;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>
