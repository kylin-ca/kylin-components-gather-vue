<script>
import { MENU_BUFFER } from '../constants'
import { watchSize, setupResizeAndScrollEventListeners } from '../utils'
import Option from './Option'
import Tip from './Tip'

const directionMap = {
  top: 'top',
  bottom: 'bottom',
  above: 'top',
  below: 'bottom',
}

export default {
  name: 'vue-treeselect--menu',
  inject: ['instance'],
  data() {
    return {
      input_value: '',
    }
  },
  computed: {
    menuStyle() {
      const { instance } = this

      return {
        maxHeight: instance.maxHeight + 'px',
      }
    },

    menuContainerStyle() {
      const { instance } = this

      return {
        zIndex: instance.appendToBody ? null : instance.zIndex,
      }
    },
  },

  watch: {
    'instance.menu.isOpen'(newValue) {
      if (newValue) {
        // In case `openMenu()` is just called and the menu is not rendered yet.
        this.$nextTick(this.onMenuOpen)
      } else {
        this.onMenuClose()
      }
    },
  },

  created() {
    this.menuSizeWatcher = null
    this.menuResizeAndScrollEventListeners = null
  },

  mounted() {
    const { instance } = this

    if (instance.menu.isOpen) this.$nextTick(this.onMenuOpen)
  },

  destroyed() {
    this.onMenuClose()
  },

  methods: {
    //自定义方法e
    inputChange(e) {
      const { instance } = this
      instance.trigger.searchQuery = e.target.value
      console.log(e.target.value) //这是输入框内容文本
    },
    clear() {
      const { instance } = this
      // console.log(instance.options) //这是输入框内容文本
      // console.log(instance.value) //这是输入框内容文本\
      // instance.value.length = 0
      for (let i = 0; i <= instance.value.length; i++) {
        this.$nextTick(() => {
          instance.value.pop()
        })
      }
    },
    selectAll() {
      const { instance } = this
      for (let i = 0; i <= instance.value.length; i++) {
        this.$nextTick(() => {
          instance.value.pop()
        })
      }
      this.pushNode(instance.options, instance.value)
    },
    pushNode(list, value) {
      list.map((i) => {
        this.$nextTick(() => {
          value.push(i.id)
        })
        if (Array.isArray(i.children) && i.children.length > 0) {
          this.pushNode(i.children, value)
        }
      })
    },
    renderMenu() {
      const { instance } = this
      if (!instance.menu.isOpen) return null
      return (
        <div
          ref="menu"
          class="vue-treeselect__menu"
          onMousedown={instance.handleMouseDown}
          style={this.menuStyle}
        >
          <div class="input_container">
            <input
              type="text"
              placeholder="请输入搜索内容"
              class="vue-treeselect__menu_input"
              onInput={this.inputChange.bind(this)}
            />
          </div>

          {this.renderBeforeList()}
          {instance.async
            ? this.renderAsyncSearchMenuInner()
            : instance.localSearch.active
            ? this.renderLocalSearchMenuInner()
            : this.renderNormalMenuInner()}
          {this.renderAfterList()}
          <div class="btn_list">
            <div onClick={this.clear}>清空</div>
            <div onClick={this.selectAll}>全选</div>
          </div>
        </div>
      )
    },

    renderBeforeList() {
      const { instance } = this
      const beforeListRenderer = instance.$scopedSlots['before-list']

      return beforeListRenderer ? beforeListRenderer() : null
    },

    renderAfterList() {
      const { instance } = this
      const afterListRenderer = instance.$scopedSlots['after-list']

      return afterListRenderer ? afterListRenderer() : null
    },

    renderNormalMenuInner() {
      const { instance } = this

      if (instance.rootOptionsStates.isLoading) {
        return this.renderLoadingOptionsTip()
      } else if (instance.rootOptionsStates.loadingError) {
        return this.renderLoadingRootOptionsErrorTip()
      } else if (
        instance.rootOptionsStates.isLoaded &&
        instance.forest.normalizedOptions.length === 0
      ) {
        return this.renderNoAvailableOptionsTip()
      } else {
        return this.renderOptionList()
      }
    },

    renderLocalSearchMenuInner() {
      const { instance } = this

      if (instance.rootOptionsStates.isLoading) {
        return this.renderLoadingOptionsTip()
      } else if (instance.rootOptionsStates.loadingError) {
        return this.renderLoadingRootOptionsErrorTip()
      } else if (
        instance.rootOptionsStates.isLoaded &&
        instance.forest.normalizedOptions.length === 0
      ) {
        return this.renderNoAvailableOptionsTip()
      } else if (instance.localSearch.noResults) {
        return this.renderNoResultsTip()
      } else {
        return this.renderOptionList()
      }
    },

    renderAsyncSearchMenuInner() {
      const { instance } = this
      const entry = instance.getRemoteSearchEntry()
      const shouldShowSearchPromptTip =
        instance.trigger.searchQuery === '' && !instance.defaultOptions
      const shouldShowNoResultsTip = shouldShowSearchPromptTip
        ? false
        : entry.isLoaded && entry.options.length === 0

      if (shouldShowSearchPromptTip) {
        return this.renderSearchPromptTip()
      } else if (entry.isLoading) {
        return this.renderLoadingOptionsTip()
      } else if (entry.loadingError) {
        return this.renderAsyncSearchLoadingErrorTip()
      } else if (shouldShowNoResultsTip) {
        return this.renderNoResultsTip()
      } else {
        return this.renderOptionList()
      }
    },

    renderOptionList() {
      const { instance } = this

      return (
        <div class="vue-treeselect__list">
          {instance.forest.normalizedOptions.map((rootNode) => (
            <Option node={rootNode} key={rootNode.id} />
          ))}
        </div>
      )
    },

    renderSearchPromptTip() {
      const { instance } = this

      return (
        <Tip type="search-prompt" icon="warning">
          {instance.searchPromptText}
        </Tip>
      )
    },

    renderLoadingOptionsTip() {
      const { instance } = this

      return (
        <Tip type="loading" icon="loader">
          {instance.loadingText}
        </Tip>
      )
    },

    renderLoadingRootOptionsErrorTip() {
      const { instance } = this

      return (
        <Tip type="error" icon="error">
          {instance.rootOptionsStates.loadingError}
          <a
            class="vue-treeselect__retry"
            onClick={instance.loadRootOptions}
            title={instance.retryTitle}
          >
            {instance.retryText}
          </a>
        </Tip>
      )
    },

    renderAsyncSearchLoadingErrorTip() {
      const { instance } = this
      const entry = instance.getRemoteSearchEntry()

      // TODO: retryTitle?

      return (
        <Tip type="error" icon="error">
          {entry.loadingError}
          <a
            class="vue-treeselect__retry"
            onClick={instance.handleRemoteSearch}
            title={instance.retryTitle}
          >
            {instance.retryText}
          </a>
        </Tip>
      )
    },

    renderNoAvailableOptionsTip() {
      const { instance } = this

      return (
        <Tip type="no-options" icon="warning">
          {instance.noOptionsText}
        </Tip>
      )
    },

    renderNoResultsTip() {
      const { instance } = this

      return (
        <Tip type="no-results" icon="warning">
          {instance.noResultsText}
        </Tip>
      )
    },

    onMenuOpen() {
      this.adjustMenuOpenDirection()
      this.setupMenuSizeWatcher()
      this.setupMenuResizeAndScrollEventListeners()
    },

    onMenuClose() {
      this.removeMenuSizeWatcher()
      this.removeMenuResizeAndScrollEventListeners()
    },

    adjustMenuOpenDirection() {
      const { instance } = this
      if (!instance.menu.isOpen) return

      const $menu = instance.getMenu()
      const $control = instance.getControl()
      const menuRect = $menu.getBoundingClientRect()
      const controlRect = $control.getBoundingClientRect()
      const menuHeight = menuRect.height
      const viewportHeight = window.innerHeight
      const spaceAbove = controlRect.top
      const spaceBelow = window.innerHeight - controlRect.bottom
      const isControlInViewport =
        (controlRect.top >= 0 && controlRect.top <= viewportHeight) ||
        (controlRect.top < 0 && controlRect.bottom > 0)
      const hasEnoughSpaceBelow = spaceBelow > menuHeight + MENU_BUFFER
      const hasEnoughSpaceAbove = spaceAbove > menuHeight + MENU_BUFFER

      if (!isControlInViewport) {
        instance.closeMenu()
      } else if (instance.openDirection !== 'auto') {
        instance.menu.placement = directionMap[instance.openDirection]
      } else if (hasEnoughSpaceBelow || !hasEnoughSpaceAbove) {
        instance.menu.placement = 'bottom'
      } else {
        instance.menu.placement = 'top'
      }
    },

    setupMenuSizeWatcher() {
      const { instance } = this
      const $menu = instance.getMenu()

      // istanbul ignore next
      if (this.menuSizeWatcher) return

      this.menuSizeWatcher = {
        remove: watchSize($menu, this.adjustMenuOpenDirection),
      }
    },

    setupMenuResizeAndScrollEventListeners() {
      const { instance } = this
      const $control = instance.getControl()

      // istanbul ignore next
      if (this.menuResizeAndScrollEventListeners) return

      this.menuResizeAndScrollEventListeners = {
        remove: setupResizeAndScrollEventListeners(
          $control,
          this.adjustMenuOpenDirection
        ),
      }
    },

    removeMenuSizeWatcher() {
      if (!this.menuSizeWatcher) return

      this.menuSizeWatcher.remove()
      this.menuSizeWatcher = null
    },

    removeMenuResizeAndScrollEventListeners() {
      if (!this.menuResizeAndScrollEventListeners) return

      this.menuResizeAndScrollEventListeners.remove()
      this.menuResizeAndScrollEventListeners = null
    },
  },

  render() {
    return (
      <div
        ref="menu-container"
        class="vue-treeselect__menu-container"
        style={this.menuContainerStyle}
      >
        <transition name="vue-treeselect__menu--transition">
          {this.renderMenu()}
        </transition>
      </div>
    )
  },
}
</script>
<style lang="scss" scoped>
.vue-treeselect__menu_input {
  width: calc(100% - 10px);
  margin: 0 5px;
}
.input_container {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #fff;
}
.btn_list {
  width: 100%;
  position: sticky;
  bottom: 0;
  height: 40px;
  z-index: 999;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.vue-treeselect div,
.vue-treeselect span {
  padding-top: 0;
  padding-bottom: 0;
}
input[type='text'],
#btn1,
#btn2 {
  box-sizing: border-box;
  font-size: 12px;
  height: 33px;
  border-radius: 4px;
  border: 1px solid #c8cccf;
  color: #6a6f77;
  -web-kit-appearance: none;
  -moz-appearance: none;
  display: block;
  outline: 0;
  padding: 0 1em;
  text-decoration: none;
}
input[type='text']:focus {
  border: 1px solid #409eff;
}
</style>