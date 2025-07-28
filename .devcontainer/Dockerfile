FROM registry.gitlab.syncad.com/hive/wax/wax-python-runtime:ubuntu24.04-1

WORKDIR /workspace
USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY . /workspace

RUN /poetry_venv/bin/pip install --upgrade pip && \
    /poetry_venv/bin/pip install 'wax==0.3.10.dev785+aeb3abb8'

SHELL ["/bin/bash", "-c"]
CMD ["bash"]
