import { updateBall, saveBall, removeBall } from '../../services/ballService';

export default (state, setState) => {
  const upsertBall = async (ball) => {
    const { id, ...newBall } = ball;
    const res = state.balls.find((b) => b.id === id)
      ? await updateBall({ id, ...newBall }) : await saveBall(newBall);

    if (res.error) {
      throw res.error;
    }

    setState((prev) => {
      const balls = prev.balls.filter((b) => b.id !== res.id).concat(res);
      return { ...prev, balls };
    });

    return res;
  };

  const deleteBall = async (ball) => {
    const res = await removeBall(ball.id);

    if (res.error) {
      throw res.error;
    }

    setState((prev) => ({ ...prev, balls: prev.balls.filter((b) => b.id !== ball.id) }));
  };

  return { balls: state.balls, upsertBall, deleteBall };
};
