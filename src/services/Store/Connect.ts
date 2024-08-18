// function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
//   // используем class expression
// return class extends Component {
//   constructor(props) {
//     super({...props, ...mapStateToProps(store.getState())});

//     // подписываемся на событие
//       store.on(StoreEvents.Updated, () => {
//         // вызываем обновление компонента, передав данные из хранилища
//         this.setProps({...mapStateToProps(store.getState())});
//           });
//   }
// } 
// }

// function mapUserToProps(state) {
// return {
//   name: state.user.name,
//   avatar: state.user.avatar,
// };
// }

// export connect(UserProfile, mapUserToProps); 
