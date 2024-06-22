"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndDeleteExpiredItem = exports.cn = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
const checkAndDeleteExpiredItem = (key, maxAge) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr)
        return;
    const user = JSON.parse(itemStr);
    const currentTime = new Date().getTime();
    // If the item is older than maxAge (in milliseconds), delete it
    if (currentTime - user.timestamp > maxAge) {
        localStorage.removeItem(key);
    }
};
exports.checkAndDeleteExpiredItem = checkAndDeleteExpiredItem;
