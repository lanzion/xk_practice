<template>
    <div class="bsinfor">
    <div data-v-125f29ad class="backend-content__right fl">
      <section data-v-7a64b9c6 data-v-125f29ad class="backend-content__middle">
        <form data-v-7a64b9c6 class="el-form el-form--label-right">
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item">
              <label for="account" class="el-form-item__label" style="width: 114px;">用户名</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-10">
                  <div data-v-7a64b9c6 class="el-input is-disabled">
                    <!---->
                    <input
                      type="text"
                      autocomplete="off"
                      placeholder="请输入用户名"
                      required="required"
                      class="el-input__inner"
                    />
                    <!---->
                    <!---->
                    <!---->
                  </div>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item is-required">
              <label for="name" class="el-form-item__label" style="width: 114px;">姓名</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-10">
                  <div data-v-7a64b9c6 class="el-input">
                    <!---->
                    <input
                      type="text"
                      autocomplete="off"
                      placeholder="请输入真实姓名"
                      class="el-input__inner"
                    />
                    <!---->
                    <!---->
                    <!---->
                  </div>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item is-required">
              <label for="sex" class="el-form-item__label" style="width: 114px;">性别</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-10">
                  <div data-v-7a64b9c6 role="radiogroup" class="el-radio-group">
                    <label
                      data-v-7a64b9c6
                      role="radio"
                      tabindex="0"
                      class="el-radio is-checked"
                      aria-checked="true"
                    >
                      <span class="el-radio__input is-checked">
                        <span class="el-radio__inner"></span>
                        <input
                          type="radio"
                          aria-hidden="true"
                          tabindex="-1"
                          class="el-radio__original"
                          value="7"
                        />
                      </span>
                      <span class="el-radio__label">
                        男
                        <!---->
                      </span>
                    </label>
                    <label data-v-7a64b9c6 role="radio" tabindex="-1" class="el-radio">
                      <span class="el-radio__input">
                        <span class="el-radio__inner"></span>
                        <input
                          type="radio"
                          aria-hidden="true"
                          tabindex="-1"
                          class="el-radio__original"
                          value="8"
                        />
                      </span>
                      <span class="el-radio__label">
                        女
                        <!---->
                      </span>
                    </label>
                  </div>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item">
              <label for="certiType" class="el-form-item__label" style="width: 114px;">证件类型</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-10">
                  <div data-v-7a64b9c6 class="el-select" required="required" style="width: 100%;">
                    <!---->
                    <div class="el-input el-input--suffix">
                      <!---->
                      <input
                        type="text"
                        readonly="readonly"
                        autocomplete="off"
                        placeholder="请选择证件类型"
                        class="el-input__inner"
                      />
                      <!---->
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
                          <!---->
                        </span>
                        <!---->
                      </span>
                      <!---->
                    </div>
                    <div
                      class="el-select-dropdown el-popper"
                      style="display: none; min-width: 344.156px;"
                    >
                      <div class="el-scrollbar" style>
                        <div
                          class="el-select-dropdown__wrap el-scrollbar__wrap"
                          style="margin-bottom: -7px; margin-right: -7px;"
                        >
                          <ul class="el-scrollbar__view el-select-dropdown__list">
                            <!---->
                            <li data-v-7a64b9c6 class="el-select-dropdown__item selected">
                              <span>居民身份证</span>
                            </li>
                            <li data-v-7a64b9c6 class="el-select-dropdown__item">
                              <span>中华人民共和国旅行证</span>
                            </li>
                            <li data-v-7a64b9c6 class="el-select-dropdown__item">
                              <span>中华人民共和国人出境通行证</span>
                            </li>
                            <li data-v-7a64b9c6 class="el-select-dropdown__item">
                              <span>暂住证</span>
                            </li>
                          </ul>
                        </div>
                        <div class="el-scrollbar__bar is-horizontal">
                          <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                        </div>
                        <div class="el-scrollbar__bar is-vertical">
                          <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                        </div>
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item is-required">
              <label for="certiNum" class="el-form-item__label" style="width: 114px;">证件号码</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-10">
                  <div data-v-7a64b9c6 class="el-input">
                    <!---->
                    <input
                      type="text"
                      autocomplete="off"
                      placeholder="请输入证件号码"
                      class="el-input__inner"
                    />
                    <!---->
                    <!---->
                    <!---->
                  </div>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <!---->
          <!---->
          <!---->
          <!---->
          <!---->
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item">
              <label for="schoolId" class="el-form-item__label" style="width: 114px;">所属学校</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-10">
                  <div data-v-7a64b9c6 class="el-input">
                    <!---->
                    <input
                      type="text"
                      autocomplete="off"
                      required="required"
                      class="el-input__inner"
                    />
                    <!---->
                    <!---->
                    <!---->
                  </div>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item">
              <label for="phone" class="el-form-item__label" style="width: 114px;">手机号码</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-10">
                  <div data-v-7a64b9c6 class="el-input">
                    <!---->
                    <input
                      type="text"
                      autocomplete="off"
                      placeholder="请输入手机号"
                      class="el-input__inner"
                    />
                    <!---->
                    <!---->
                    <!---->
                  </div>
                </div>
                <div data-v-7a64b9c6 class="pdl15 el-col el-col-4">
                  <router-link
                    data-v-7a64b9c6
                    to="/imbinding"
                    class="psn-cancel-btn"
                  >修改绑定</router-link>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item">
              <label for="email" class="el-form-item__label" style="width: 114px;">电子邮箱</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-10">
                  <div data-v-7a64b9c6 class="el-input">
                    <!---->
                    <input
                      type="text"
                      autocomplete="off"
                      placeholder="请输入电子邮箱"
                      class="el-input__inner"
                    />
                    <!---->
                    <!---->
                    <!---->
                  </div>
                </div>
                <div data-v-7a64b9c6 class="pdl15 el-col el-col-4">
                  <router-link data-v-7a64b9c6 to="/momailbox" class="psn-cancel-btn">修改绑定</router-link>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item">
              <label for="address" class="el-form-item__label" style="width: 114px;">联系地址</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-10">
                  <div data-v-7a64b9c6 class="el-input">
                    <!---->
                    <input
                      type="text"
                      autocomplete="off"
                      placeholder="请输入联系地址"
                      class="el-input__inner"
                    />
                    <!---->
                    <!---->
                    <!---->
                  </div>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div data-v-7a64b9c6 class="el-row">
            <div data-v-7a64b9c6 class="el-form-item is-success">
              <label for="sign" class="el-form-item__label" style="width: 114px;">个性签名</label>
              <div class="el-form-item__content" style="margin-left: 114px;">
                <div data-v-7a64b9c6 class="el-col el-col-20">
                  <div data-v-7a64b9c6 class="el-textarea">
                    <textarea
                      placeholder="请输入个性签名"
                      maxlength="500"
                      rows="5"
                      class="el-textarea__inner"
                      style="resize: none; min-height: 33px;"
                    ></textarea>
                  </div>
                </div>
                <!---->
              </div>
            </div>
          </div>

          <div data-v-7a64b9c6 class="el-form-item">
            <!---->
            <div class="el-form-item__content frto" style="margin-left: 114px;">
              <button data-v-7a64b9c6 class="psn-confirm-btn">保存</button>
              <!---->
            </div>
          </div>
        </form>
        <!---->
        <div
          data-v-3f095af6
          data-v-7a64b9c6
          class="el-dialog__wrapper transfer-school"
          style="display: none;"
        >
          <div class="el-dialog" style="margin-top: 15vh;">
            <div class="el-dialog__header">
              <span class="el-dialog__title"></span>
              <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                <i class="el-dialog__close el-icon el-icon-close"></i>
              </button>
            </div>
            <!---->
            <!---->
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
    name:'basedata',
    data() {
    return {};
  },
  created() {
    this.$store.commit("changetitle", "基本资料");
  }
}
</script>
<style lang="scss" scoped>
.fl {
  float: left;
}
.backend-content__right[data-v-125f29ad] {
  width: 980px;
}
[data-v-125f29ad] {
  box-sizing: border-box;
}
.backend-content__middle,
.datadict {
  margin-bottom: 20px;
}

[data-v-125f29ad] {
  box-sizing: border-box;
}
.backend-content__middle {
  padding: 20px;
  background-color: #fff;
}
.el-row {
  box-sizing: border-box;
}
.el-row:after,
.el-row:before {
  display: table;
}
.el-form-item {
  margin-bottom: 22px;
}
.el-form-item:after,
.el-form-item:before {
  display: table;
  content: "";
}
.el-form-item__label {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
}
.el-form-item__content:after,
.el-form-item__content:before {
  display: table;
  content: "";
}
.el-col-10 {
  width: 41.66667%;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
[class*="el-col-"] {
  float: left;
  box-sizing: border-box;
}
.el-input.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}

.el-input__inner {
  height: 36px;
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
input,
select,
textarea {
  font-family: inherit;
}
input,
select {
  vertical-align: middle;
}
.el-form-item__content:after {
  clear: both;
}
.el-form-item__content:after,
.el-form-item__content:before {
  display: table;
  content: "";
}
.el-form-item:after {
  clear: both;
}
.el-form-item:after,
.el-form-item:before {
  display: table;
  content: "";
}
.el-row:after {
  clear: both;
}
.el-row:after,
.el-row:before {
  display: table;
}
.pdl15[data-v-7a64b9c6] {
  padding-left: 15px;
}
.el-col-4 {
  width: 16.66667%;
}
[class*="el-col-"] {
  float: left;
  box-sizing: border-box;
}
.psn-cancel-btn {
  padding: 4px 14px;
  border: 1px solid #de1601;
  color: #de1601;
  font-size: 14px;
  border-radius: 5px;
  margin-right: 10px;
  &:hover{
      background: #de1601;
      color:#fff;
  }
}
a {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  text-decoration: none;
  color: #3e3e3e;
  cursor: pointer;
}
.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
}
.psn-confirm-btn {
  padding: 5px 15px;
  font-size: 14px;
  color: #fff;
  background-color: #2165fe;
  border-radius: 5px;
  margin-right: 10px;
}
button {
  border: 1px solid;
  background-color: transparent;
  cursor: pointer;
}
.frto{
    float: right;
    margin-right: 126px;
}
</style>
