(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const errorMsg = document.getElementById('error-msg');
    const list = document.getElementById('todo-list');
    const counter = document.getElementById('counter');
    const filterButtons = {
      all: document.getElementById('filter-all'),
      active: document.getElementById('filter-active'),
      done: document.getElementById('filter-done')
    };

    let currentFilter = 'all';

    const showError = (show) => {
      errorMsg.classList.toggle('hidden', !show);
    };

    const updateCounter = () => {
      const left = list.querySelectorAll('li:not(.completed)').length;
      counter.textContent = `${left} ${left === 1 ? 'item' : 'items'} left`;
    };

    const applyFilter = () => {
      list.querySelectorAll('li').forEach((item) => {
        const done = item.classList.contains('completed');
        const visible =
          currentFilter === 'all' ||
          (currentFilter === 'active' && !done) ||
          (currentFilter === 'done' && done);
        item.style.display = visible ? '' : 'none';
      });
    };

    const refresh = () => {
      applyFilter();
      updateCounter();
    };

    const addItem = () => {
      const text = input.value.trim();
      if (text === '') {
        showError(true);
        return;
      }
      showError(false);

      const li = document.createElement('li');

      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'delete-btn';
      del.textContent = 'Delete';

      li.append(span, del);
      list.append(li);

      input.value = '';
      input.focus();
      refresh();
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addItem();
    });

    list.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li || !list.contains(li)) return;

      if (e.target.closest('.delete-btn')) {
        li.remove();
      } else if (e.target.closest('.item-text')) {
        li.classList.toggle('completed');
      }
      refresh();
    });

    const setFilter = (name) => {
      currentFilter = name;
      refresh();
    };
    filterButtons.all.addEventListener('click', () => setFilter('all'));
    filterButtons.active.addEventListener('click', () => setFilter('active'));
    filterButtons.done.addEventListener('click', () => setFilter('done'));

    refresh();
  });
})();