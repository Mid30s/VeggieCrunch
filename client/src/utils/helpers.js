// helpers.js
export function getTotalPrice(cartItems) {
  return cartItems
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("veggie-crunch", 1);
    let db, tx, store;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          if (Array.isArray(object)) {
            object.forEach((item) => {
              if (item && item._id) {
                store.put(item);
              }
            });
            resolve(object);
          } else if (object && object._id) {
            store.put(object);
            resolve(object);
          } else {
            console.error(
              "Attempted to put invalid object into the database:",
              object
            );
          }
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
