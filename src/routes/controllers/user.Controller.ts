import { Request, Response, NextFunction } from "express";
import Meeting from "../../models/Meeting";
import User from "../../models/User";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, name, picture, email } = req.body.user;
  const { expoPushToken } = req.body;

  if (!id || !name || !picture || !email) {
    return res.status(401).send({ message: "Invalid user" });
  }

  try {
    const user = await User.findOne({ id });

    if (!user) {
      await User.create({
        name,
        id,
        picture,
        email,
        expoPushToken,
      });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const patchOpenTime = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.openTime = req.body.selectedDateTime;
    await user.save();
  } catch (err) {
    next(err);
  }
};

export const getOpenTime = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).send("users not found");
    }

    res.send(users);
  } catch (err) {
    next(err);
  }
};

export const patchChangeTime = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    const selectTime = req.body.selectUserUTCTime;

    if (!user || !user.openTime || !user.reservationTime) {
      return res.status(404).send("User not found");
    }

    const userOpenTime = user.openTime;
    const newOpenTime = userOpenTime.filter(
      (userOpenTime) => userOpenTime !== selectTime,
    );

    user.openTime = newOpenTime;
    user.reservationTime = [...user.reservationTime, selectTime];
    await user.save();

    res.status(200).json({ message: "Time updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const getMeetings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const meetings = await Meeting.find({
      $or: [{ "requestee.id": id }, { "requester.id": id }],
    });
    if (!meetings) {
      return res.status(404).send("User not found");
    }
    meetings.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });

    res.send(meetings);
  } catch (err) {
    next(err);
  }
};

export const getAcceptedMeetings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const meetings = await Meeting.find({
      $and: [
        {
          $or: [{ "requestee.id": id }, { "requester.id": id }],
        },
        {
          status: "accepted",
        },
      ],
    });
    if (!meetings) {
      return res.status(404).send("User not found");
    }
    meetings.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });

    res.send(meetings);
  } catch (err) {
    next(err);
  }
};

export const patchCancelReservationTime = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    const { time } = req.body;

    if (!user || !user.reservationTime) {
      return res.status(404).send("User not found");
    }
    const reservationTime = user.reservationTime;
    const newReservationTime = reservationTime.filter(
      (userOpenTime) => userOpenTime !== time,
    );

    user.reservationTime = newReservationTime;
    await user.save();
    res.status(200).json({ message: "Time updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const patchCancelTime = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.userId;
    const user = await User.findOne({ id });
    const { time } = req.body;

    if (!user || !user.reservationTime || !user.openTime) {
      return res.status(404).send("User not found");
    }

    const userOpenTime = user.openTime;
    const reservationTime = user.reservationTime;
    const newReservationTime = reservationTime.filter(
      (userOpenTime) => userOpenTime !== time,
    );

    user.openTime = [...userOpenTime, time];
    user.reservationTime = newReservationTime;

    await user.save();
    res.status(200).json({ message: "Time updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const patchCheckTime = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });

    const now = new Date();
    now.setHours(now.getHours() - 1);

    if (!user || !user.openTime) {
      return res.status(404).send("User not found");
    }

    if (user.openTime.length !== 0) {
      const filteredTimes = user.openTime
        .map((time) => new Date(time))
        .filter((meetingTime) => meetingTime > now)
        .map((meetingTime) => meetingTime.toISOString());

      user.openTime = filteredTimes;
      await user.save();
    }

    res.status(200).json({ message: "Time updated successfully" });
  } catch (err) {
    next(err);
  }
};
