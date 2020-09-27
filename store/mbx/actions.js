import axios from 'axios';

export const GET_STARS = ({ commit }) => {
  const { data } = axios.get('http://my-api/stars')
  commit('SET_STARS', data)
}

export const getDetailDataKelas = ({state}) => {
  return state.dataDetailKelas;
}
