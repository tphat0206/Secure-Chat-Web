# Pull base image
FROM python:3.10

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY ./requirements.txt .
RUN apt-get update && \
    apt-get install --no-install-suggests --no-install-recommends --yes gcc g++ libpython3-dev libpq-dev && \
    apt-get install -y postgresql-client git zsh curl && \
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" && \
    echo "export PS1=\"(DOCKER)\$PS1\"" >> /root/.zshrc && \
    apt-get remove -y git && \
    python -m venv /venv && \
    /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install -r requirements.txt

# Copy project
COPY . .
RUN PATH="$PATH:/usr/bin/zsh"
ENV VIRTUAL_ENV /venv
ENV PATH /venv/bin:$PATH

EXPOSE 8000