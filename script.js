document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!fullname || !username || !email || !password) {
    registerMessage.textContent = 'لطفاً همه فیلدها را پر کنید.';
    registerMessage.style.color = '#ff8080';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  users[username] = { fullname, email, password };
  localStorage.setItem('users', JSON.stringify(users));

  registerMessage.textContent = `ثبت‌نام با موفقیت انجام شد. خوش آمدید، ${fullname}!`;
  registerMessage.style.color = '#6ee7b7';
  registerForm.reset();
});

const gradeBtn = document.getElementById('gradeBtn');
const gradeUsername = document.getElementById('gradeUsername');
const gradesBody = document.getElementById('gradesBody');

const sampleGrades = [
  { subject: 'طراحی وب', score: 19 },
  { subject: 'برنامه‌نویسی پایه', score: 18 },
  { subject: 'ریاضی', score: 17 },
  { subject: 'پایگاه داده', score: 19.5 },
];

function statusOf(score) {
  return score >= 10 ? 'قبول' : 'مردود';
}

gradeBtn.addEventListener('click', () => {
  const uname = gradeUsername.value.trim();
  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (!uname) {
    gradesBody.innerHTML = `<tr><td colspan="3" class="empty-row">لطفاً نام کاربری را وارد کنید.</td></tr>`;
    return;
  }

  if (!users[uname]) {
    gradesBody.innerHTML = `<tr><td colspan="3" class="empty-row">کاربری با این نام یافت نشد. ابتدا ثبت‌نام کنید.</td></tr>`;
    return;
  }

  gradesBody.innerHTML = sampleGrades.map(g => `
    <tr>
      <td>${g.subject}</td>
      <td>${g.score}</td>
      <td>${statusOf(g.score)}</td>
    </tr>
  `).join('');
});
