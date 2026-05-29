import { defineCustomElement } from 'vue';

import VButtonComponent from './shared/ui/VButton/VButton.vue';
import VChipComponent from './shared/ui/VChip/VChip.vue';
import VIconComponent from './shared/ui/VIcon/VIcon.vue';
import VInputComponent from './shared/ui/VInput/VInput.vue';
import VLoaderComponent from './shared/ui/VLoader/VLoader.vue';
import VModalComponent from './shared/ui/VModal/VModal.vue';
import VSelectComponent from './shared/ui/VSelect/VSelect.vue';
import VTooltipComponent from './shared/ui/VTooltip/VTooltip.vue';
import VirtualScrollComponent from './shared/ui/VirtualScroll/VirtualScroll.vue';

const VButton = defineCustomElement(VButtonComponent);
const VChip = defineCustomElement(VChipComponent);
const VIcon = defineCustomElement(VIconComponent);
const VInput = defineCustomElement(VInputComponent);
const VLoader = defineCustomElement(VLoaderComponent);
const VModal = defineCustomElement(VModalComponent);
const VSelect = defineCustomElement(VSelectComponent as never);
const VTooltip = defineCustomElement(VTooltipComponent);
const VirtualScroll = defineCustomElement(VirtualScrollComponent as never);

customElements.define('v-button', VButton);
customElements.define('v-chip', VChip);
customElements.define('v-icon', VIcon);
customElements.define('v-input', VInput);
customElements.define('v-loader', VLoader);
customElements.define('v-modal', VModal);
customElements.define('v-select', VSelect);
customElements.define('v-tooltip', VTooltip);
customElements.define('v-virtual-scroll', VirtualScroll);
